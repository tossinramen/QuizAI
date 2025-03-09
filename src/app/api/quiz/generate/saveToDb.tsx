import { db } from "@/db";
import { quizzes, questions as dbQuestions, questionAnswers } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type Quiz = InferInsertModel<typeof quizzes>;
type Question = InferInsertModel<typeof dbQuestions>;
type Answer = InferInsertModel<typeof questionAnswers>;

interface SaveQuizData extends Quiz {
    questions: Array<Question & { answers?: Answer[] }>; // ✅ Fix typo (`question` -> `questions`)
}

export default async function saveQuiz(quizData: SaveQuizData) {
    const { name, description, questions } = quizData; // ✅ Ensure correct destructuring

    const newQuiz = await db
        .insert(quizzes)
        .values({ name, description })
        .returning({ insertedId: quizzes.id });

    const quizId = newQuiz[0].insertedId;

    await db.transaction(async (tx) => {
        for (const question of questions) {
            const [{ id: questionId }] = await tx // ✅ Fix: Use "id" instead of "questionId"
                .insert(dbQuestions)
                .values({
                    questionText: question.questionText,
                    quizId
                })
                .returning({ id: dbQuestions.id });

            if (question.answers && question.answers.length > 0) { // ✅ Fix: Ensure `answers` exists
                await tx.insert(questionAnswers).values(
                    question.answers.map((answer) => ({
                        answerText: answer.answerText,
                        isCorrect: answer.isCorrect,
                        questionId
                    }))
                );
            }
        }
    });

    return { quizId }; // ✅ Ensure quizId is returned correctly
}
