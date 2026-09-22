import{useState} from "react"

type MyFormProps = {
    sendQuestionToParent: (text: string) => void;
}

export default function MyForm({sendQuestionToParent}: MyFormProps){
   const [input, setInput] = useState("")

   return(
    <form
    onSubmit={(e) => {
        e.preventDefault()
        sendQuestionToParent(input)}}>
        
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
    </form>
   )
}