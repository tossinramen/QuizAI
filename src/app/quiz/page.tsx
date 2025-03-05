"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [started, setStarted] = useState(false);
    const handleNext = () => {
        setStarted(true);
    }
  return (
    <div className="flex flex-col flex-1">
    <main className="flex justify-center flex-1">
      {!started ? <h1 className="text-3xl font-bold">Welcome to the quiz page 👋</h1>
      : (
        <div >
            <h2 className="text-3xl font-bold">What is your level of understanding of React?</h2>
            <div>
                <Button>Beginner</Button>
                <Button>Intermediate</Button>
                <Button>Advanced</Button>
                <Button>Expert</Button>
            </div>
        </div>
      )}
    </main>
    <footer className="footer pb-9 px-6 relative mb-0">
      <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
    </footer>
    </div>
  )
}
