import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import saveQuiz from "./saveToDb";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

    // ✅ Fix: Check if API key is missing
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
    }

    try {
        const pdfLoader = new PDFLoader(document as Blob, {
            parsedItemSeparator: ""
        });

        const docs = await pdfLoader.load();
        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);

        const prompt = `Given the text, which is a summary of the document, generate a quiz based on the text. 
        Return JSON only that contains a quiz object with fields: name, description, and questions. 
        The questions field should be an array of objects with fields: questionText, answers. 
        The answers field should be an array of objects with fields: answerText, isCorrect.`;




        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4o-mini"
        });
        
        const parser = new JsonOutputFunctionsParser(); 
        const extractionFunctionsSchema= {
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
                                items:{
                                    type: "object",
                                    properties: {
                                        questionText: { type: "string" },
                                        answers : {
                                            type: "array", 
                                            item: {
                                                type: "object",
                                                properties: {
                                                    answerTexxt: { type: "string" },
                                                    isCorrect: { type: "boolean "},
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }
        
        const runnable = model.bind({
            functions: [extractionFunctionsSchema],
            function_call: { name: "extractor "},
        }).pipe(parser);

        const message = new HumanMessage(prompt + "\n" + texts.join("\n"));

        const result = await runnable.invoke([message]);
        console.log("API Response:", result); // ✅ Added console log
        const { quizId } = await saveQuiz(result.quiz);

        return NextResponse.json({ quizId }, { status: 200 });

    } catch (e: any) {
        console.error("API Error:", e); // ✅ Log error
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
