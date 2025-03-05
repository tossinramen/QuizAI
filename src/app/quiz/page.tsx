"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ui/progressBar";
import { ChevronLeft, X } from "lucide-react";



const questions = [
    {
        questionText: "What is React?",
        answers: [
            { answerText: "A library for building user interfaces", isCorrect: true, id: 1 },
            { answerText: "asdasd", isCorrect: false, id: 2 },
            { answerText: "asdasdasdasda", isCorrect: false, id: 3 },
            { answerText: "hgasfsaa", isCorrect: true, id: 4 },
        ]
    },
    {
        questionText: "Which of the following is a JavaScript framework?",
        answers: [
            { answerText: "React", isCorrect: true, id: 5 },
            { answerText: "Python", isCorrect: false, id: 6 },
            { answerText: "HTML", isCorrect: false, id: 7 },
            { answerText: "CSS", isCorrect: false, id: 8 },
        ]
    },
    {
        questionText: "What does 'useState' do in React?",
        answers: [
            { answerText: "Manages component state", isCorrect: true, id: 9 },
            { answerText: "Handles API calls", isCorrect: false, id: 10 },
            { answerText: "Creates a new component", isCorrect: false, id: 11 },
            { answerText: "Adds event listeners", isCorrect: false, id: 12 },
        ]
    }
];

    

export default function Home() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const handleNext = () => {
        if(!started) {
            setStarted(true);
            return;
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        
    }
  return (
    <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className='grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2'>
                <Button size='icon' variant='outline'><ChevronLeft /></Button>
                <ProgressBar value={(currentQuestion/ questions.length)*100}/>
                <Button size='icon' variant= 'outline'>
                    <X />
                </Button>
                
            </header>
        </div>
    <main className="flex justify-center flex-1">
        <div></div>
  {!started ? (
    <h1 className="text-3xl font-bold">Welcome to the quiz page 👋</h1>
  ) : (
    <div>
      <h2 className="text-3xl font-bold">
        {questions[currentQuestion].questionText}
      </h2>
      <div className="grid grid-cols-1 gap-6 mt-6">
        {questions[currentQuestion].answers.map((answer) => (
          <Button key={answer.id} variant="secondary">
            {answer.answerText}
          </Button>
        ))}
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
