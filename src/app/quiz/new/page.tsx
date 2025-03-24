
import UploadDoc from "../UploadDoc";
import { auth, signIn } from "@/auth";
import { getUserSubscription } from "@/app/actions/userSubscription";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { Lock, Flame } from "lucide-react";
import { PRICE_ID } from "@/lib/utils";
const page = async () => {
    const session = await auth();
    const router = useRouter();
    const userId = session?.user?.id;
    if (!userId){
        signIn();
        return;
    }
    const subscribed: boolean | null | undefined = await getUserSubscription({ userId })

    const onNavigateToUpgrade = async(price: string) => {
        if(!userId) {
            router.push('/login')
        }
        

        try {
            const { sessionId } = await fetch('/api/stripe/checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price })
            }).then((res) => res.json());
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
        
            console.log('Subscribe Button Error', error)
        }
        

    }


    return(
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
                {subscribed ?
                <>
                
                <h2 className="text-3xl font-bold mb-4">What do you want to be quizzed about today?</h2>
            <UploadDoc />
            </> :
            <button onClick={() => onNavigateToUpgrade(PRICE_ID)} className="rounded-md bg-primary hover:bg-primary-shadow p-10 sm:h-80 sm:w-80">
                
                <div className="flex items-center flex-col cursor-pointer w-full h-full">
                    <div className="flex-1 flex items-center flex-col">
                    <h2 className="text-3l font-bold mb-4">Subscribe to Upload Documents and Generate Quizzes </h2>
                    
                    <Lock className="w-12 h-12" />
                    </div>
                    <div className="flex w-full flex-row items-end">
                    <div className="bg-white p-3 rounded-full text-black flex flex-row items-end gap-2">
                        <Flame />
                        <p>Upgrade</p></div>
                        </div>
                </div>
            </button>
}
            </main>
        </div>
    )
}



export default page;