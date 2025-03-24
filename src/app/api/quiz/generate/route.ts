import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import saveQuiz from "./saveToDb";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
    }

    try {
        const pdfLoader = new PDFLoader(document as Blob, {
            parsedItemSeparator: ""
        });

        const docs = await pdfLoader.load();
        const texts = docs.map((doc) => doc.pageContent).filter(Boolean).join("\n");

        if (!texts) {
            return NextResponse.json({ error: "Failed to extract text from PDF" }, { status: 400 });
        }

        const prompt = `Given the text, generate a quiz as JSON with fields: name, description, and questions. 
                        Each question should have questionText and answers (with answerText and isCorrect fields).`;

        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4o-mini"
        });

        const parser = new JsonOutputFunctionsParser();
        const extractionFunctionsSchema = {
            name: "extractor",
            description: "Extracts fields from the output",
            parameters: {
                type: "object",
                properties: {
                    quiz: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            description: { type: "string" },
                            questions: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionText: { type: "string" },
                                        answers: {
                                            type: "array",
                                            items: { // ✅ Fix incorrect "item" -> "items"
                                                type: "object",
                                                properties: {
                                                    answerText: { type: "string" }, // ✅ Fix "answerTexxt"
                                                    isCorrect: { type: "boolean" }, // ✅ Fix "boolean " (extra space)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const runnable = model.bind({
            functions: [extractionFunctionsSchema],
            function_call: { name: "extractor" }, // ✅ Fix: Remove extra space
        }).pipe(parser);

        const message = new HumanMessage(prompt + "\n" + texts);

<<<<<<< HEAD
        const result : any = await runnable.invoke([message]);
=======
        const result = await runnable.invoke([message]);
>>>>>>> recovered-history

        console.log("API Response:", result); // ✅ Added console log
        const { quizId } = await saveQuiz(result.quiz);

        return NextResponse.json({ quizId }, { status: 200 });

    } catch (e: any) {
        console.error("API Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
