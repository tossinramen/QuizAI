"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ui/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizSubmission from "./QuizSubmission"

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
    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean| null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleNext = () => {
        if(!started) {
            setStarted(true);
            return;
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else{
          setSubmitted(true);
          return;
        }
        setSelectedAnswer(null);
        setIsCorrect(null);
        
    }
<<<<<<< HEAD
    const handleAnswer = (answer: any) => {
=======
    const handleAnswer = (answer) => {
>>>>>>> recovered-history
      setSelectedAnswer(answer.id);
      const isCurrentCorrect = answer.isCorrect;
      if (isCurrentCorrect) {
        setScore(score+1);
      }
      setIsCorrect(isCurrentCorrect);
    }
    const scorePercentage: number = Math.round((score/questions.length)*100);

    if (submitted) {
      return (
        <QuizSubmission
        score = {score}
        scorePercentage={scorePercentage}
        totalQuestions={questions.length}
        />
      )
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
        {questions[currentQuestion].answers.map((answer) => {
          const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";
          return(
          <Button key={answer.id} variant={variant} size="xl" onClick ={() => handleAnswer(answer)}>
            <p className="whitespace-normal">{answer.answerText}</p>
            
          </Button>
        )
        })
        }
      </div>
    </div>
  )}
    </main>

    <footer className="footer pb-9 px-6 relative mb-0">
<<<<<<< HEAD
      <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""} />
=======
      <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText} />
>>>>>>> recovered-history
      <Button variant="neo" size="lg" onClick={handleNext}>{!started ?
       'Start' : (currentQuestion === questions.length -1) ? 'Submit'  : 'Next'}</Button>
    </footer>
    </div>
  )
}
