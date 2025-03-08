import React from 'react'
import { clsx } from 'clsx' //easier for tailwind to write conditional classnames
import { cn } from "@/lib/utils"
type Props = {
    isCorrect: boolean | null,
    correctAnswer: string
}

const ResultCard = (props: Props) => {
    const { isCorrect } = props;
    if(isCorrect === null){
        return null
    }
    const text = isCorrect ? 'Correct!' : 'Incorrect! The correct answer is: ' + props.correctAnswer;
    const borderClasses = isCorrect ? "border border-green-500" : "border border-red-500";

  return (
    <div className={borderClasses}>{text}</div>
  )
}

export default ResultCard