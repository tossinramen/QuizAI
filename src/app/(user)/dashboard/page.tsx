import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";


const page = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return (<p>User not found</p>)
    };

    const userQuizzes = await db.query.quizzes.findMany(
        {
            where: eq(quizzes.userId, userId)

        }
    );
    console.log(userQuizzes)
    return(
        <div>dashboard</div>
    )
}

export default page;