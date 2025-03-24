
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
import UpgradePlan from "../UpgradePlan";
const page = async () => {
    const session = await auth();
    //const router = useRouter();
    const userId = session?.user?.id;
    if (!userId){
        signIn();
        return;
    }
    const subscribed: boolean | null | undefined = await getUserSubscription({ userId })

    


    return(
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
                {subscribed ?
                <>
                
                <h2 className="text-3xl font-bold mb-4">What do you want to be quizzed about today?</h2>
            <UploadDoc />
            </> :
            <UpgradePlan />
            
}
            </main>
        </div>
    )
}



export default page;