"use server";
import { db } from "@/db";
import { quizSubmissions } from "@/db/schema";
import { auth } from "@/auth";
import { InferInsertModel } from "drizzle-orm";

type submissions = InferInsertModel<typeof quizSubmissions>;

export async function saveSubmission(sub: submissions, quizId:number) {
    const { score } = sub;
    

    const newSubmission = await db.insert(quizSubmissions).values({score,quizId}).returning({ insertedId: quizSubmissions.id});
    const submissionId = newSubmission[0].insertedId;
    return submissionId;

}