import { useState } from "react";
import styles from "./Chat.module.css";
import sendUserInput from "../../services/chatService";

export default function Chat() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("The answer will be here 💬");

  async function handleSend() {
  
  //delete empyt spacse in the beginning and end; if empty, return
  if (!input.trim()) return; 

  //Todo: insert the input question in another area, like in ChatGPT
  
  const res = await sendUserInput(input);
  setAnswer(res.data.response);

  //clear input area
  setInput("");  

  }

  return (
    <div className={styles.container}>
       
      {/* answer area*/}
      <div className={styles.answerArea}>
        {answer}
      </div>

      {/* input area*/}
      <div className={styles.inputArea}>
         <textarea
          className={styles.inputTextArea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write something"
        />
        <button 
          className={styles.button}
          onClick={handleSend}>
          Send
        </button>
      </div>

    </div>
  );
}




  
  

