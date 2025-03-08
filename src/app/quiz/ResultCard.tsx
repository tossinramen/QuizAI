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
    const borderClasses = clsx({
        "border-green-500" : isCorrect,
        "border-red-500": !isCorrect
    })
  
    return (
      <div className={cn(
        borderClasses,
        "border-2",
        "rounded-lg",
        "p-4",
        "flex", // Enables flexbox
        "justify-center", // Centers text horizontally
        "items-center", // Centers text vertically
        "text-center", // Ensures text alignment
        "text-xl", // Increases font size
        "font-semibold",
        "my-4",
        "bg-secondary"
      )}>
        {text}
      </div>
    )
}

export default ResultCard
