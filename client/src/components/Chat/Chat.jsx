import { useState } from "react";
import styles from "./Chat.module.css";

export default function Chat() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("The answer will be here 💬");

  function handleSend() {
  
  //delete empyt spacse in the beginning and end; if empty, return
  if (!input.trim()) return; 

  //Todo: send the input to BE, ask for an answer, upadte the answer
  
  //clear input area
  setInput("");

  //TODO: delete later, this is for checking
  alert("button works 💗")
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




  
  

