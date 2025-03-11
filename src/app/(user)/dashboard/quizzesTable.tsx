import { quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
export type Quiz = InferSelectModel<typeof quizzes>;


type Props = {
    quizzes: Quiz[]
}
const QuizzesTable = () => {
    return (
        <></>
    )
};


export default QuizzesTable;