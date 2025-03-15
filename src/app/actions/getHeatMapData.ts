import { quizzes, questions, quizSubmissions, users } from "@/db/schema";
import { auth } from "@/auth";
import { db } from "@/db";
import { count, eq, avg } from "drizzle-orm";


const getHeatMapData = () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return;
    }
};


export default getHeatMapData;