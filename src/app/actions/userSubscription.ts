import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function createSubscrpition({
    stripeCustomerId
}:{
    stripeCustomerId: string
}) {
    await db
    .update(users)
    .set({
        subscribed: true,
    })
    .where(
        eq(
            users.stripeCustomerId,
            stripeCustomerId
        )
    );
}

export async function deleteSubscrpition({
    stripeCustomerId
}:{
    stripeCustomerId: string
}) {
    await db
    .update(users)
    .set({
        subscribed: false,
    })
    .where(
        eq(
            users.stripeCustomerId,
            stripeCustomerId
        )
    );
}