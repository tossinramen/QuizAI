import { quizzes, questions, quizSubmissions } from "@/db/schema";
import { auth } from "@/auth";
import { db } from "@/db";
import { count, eq } from "drizzle-orm";
const getUserMetrics = async() => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return;
    }

    const numQuizzes = await db.select({ value: count()}).from(quizzes).where(
        eq(quizzes.userId, userId)
    );

};
export default getUserMetrics;