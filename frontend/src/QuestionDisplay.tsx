import { useEffect, useState} from "react";
import type { Question } from "./App";

type QuestionDisplayProps ={
    questions: Question[]
    upvoteQuestion: (id: string) => void
}

function getTimeUntilNextUpdate(createdAt: number, currentTime: number){
    const elapsedTime = Math.max(0, currentTime - createdAt)
    switch (true) {
        case elapsedTime < 600000:
            return 60000 - (elapsedTime % 60000)
        case elapsedTime < 3600000:
            return 300000 - (elapsedTime % 300000)
        default:
            return 900000 - (elapsedTime % 900000)
    }
}

function getNextUpdateTime(questions: Question[], currentTime: number){
    let nextUpdate = Infinity
    questions.forEach(element => { 
        const updateTime = currentTime + getTimeUntilNextUpdate(element.createdAt, currentTime)
        if (updateTime < nextUpdate) {
            nextUpdate = updateTime
        }
    });
    return nextUpdate;
}

function timeDisplayHelper(currentTime: number, createdAt: number){
    const time = Math.floor(Math.max(0, (currentTime - createdAt) / 60000))
    if (time <= 0) return "Just now"
    else if (time < 2) return "1 minute ago"
    else if (time < 10) return time + " minutes ago"
    else if (time < 60) return Math.floor(time / 5) * 5 + " minutes ago"
    else if (time < 75) return "1 hour ago" 
    else if (time < 120) return "1 hour " + Math.floor((time - 60) / 15) * 15 + " minutes ago"
    const remainingMinutes = time - Math.floor(time / 60) * 60
    if (remainingMinutes < 15) return Math.floor(time / 60) + " hours ago"
    else return Math.floor(time / 60) + " hours " + Math.floor(remainingMinutes / 15) * 15 + " minutes ago"
}

export default function QuestionDisplay( {questions, upvoteQuestion} : QuestionDisplayProps){
    
    const [currentTime, setCurrentTime] = useState(Date.now())
    

    useEffect(() => {
        if (questions.length === 0){
            return
        }
        const timeout = setTimeout(() => {
            setCurrentTime(Date.now())
        }, getNextUpdateTime(questions, currentTime) - currentTime)

        return () => {
            clearTimeout(timeout)
        }
    }, [currentTime, questions.length])

    const sortedQuestions = questions.toSorted((a, b) => b.upvotes - a.upvotes);

    return(
    <div>
        <p>Questions: </p>
        <ul>
            {sortedQuestions.map((value) => (
                <li key={value.id}>{value.question} {value.upvotes} likes &nbsp;
                    {timeDisplayHelper(currentTime, value.createdAt)} &nbsp; 
                    <button type="button"
                    onClick={() => upvoteQuestion(value.id)}
                    >upvote</button>
                </li>
            ))}
        </ul>
    </div>
);
}