"use client";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button"
type Props = {
    userId?: string,
    price: string
}

const SubscribeBtn = ({ userId, price} : Props) => {
    const router = useRouter();
    const handleCheckout = async(price: string) => {
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
        <Button onClick={() => handleCheckout(price)}>Upgrade Your Plan</Button>
    )
}



export default SubscribeBtn;