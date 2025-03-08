import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

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
    if (process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "OpenAI API key"}, { status : 500 });
    }
        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4o-mini"
        });

        const message = new HumanMessage(prompt + "\n" + texts.join("\n"));

        const result = await model.invoke([message]);
        console.log(result);

        return NextResponse.json({ message: "Created successfully" }, { status: 200 });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
