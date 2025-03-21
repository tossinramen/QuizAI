"use client";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";

type Props = {
    userId?: string,
    price: string
}

const SubscribeBtn = ({ userId, price} : Props) => {
    const router = useRouter();
    return(
        <></>
    )
}



export default SubscribeBtn;