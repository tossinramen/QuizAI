import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export async function POST(
req: Request


) {
    const { price, quantity = 1 } = await req.json();
    const userSession = await auth();
    const userId = userSession?.user?.id;
    if (!userId) {
        return new Response(
            JSON.stringify({
                error: "Unauthorized"
            }),
            {
                status: 401
            }
        )
    }

}