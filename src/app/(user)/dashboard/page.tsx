import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";
import QuizzesTable, { Quiz } from "./quizzesTable";
import getUserMetrics from "@/app/actions/getUserMetrics";
import MetricCard from "./metricCard";

const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
        return <p>User not found</p>;
    }

    const userQuizzes: Quiz[] = await db.query.quizzes.findMany({
        where: eq(quizzes.userId, userId)
    });
    
    const userData = await getUserMetrics();
    console.log(userData);
    
    return (
        <>
            {userData?.length > 0 &&
                userData.map((metric) => (
                    <MetricCard key={metric.label} label={metric.label} value={metric.value} />
                ))}
            <QuizzesTable quizzes={userQuizzes} />
        </>
    );
};

export default page;