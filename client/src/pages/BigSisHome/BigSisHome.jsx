import { useEffect, useRef, useState } from "react";
import sendUserInput from "../../services/chatService.js";
import { QUICK_TOPICS } from "../../config/quickTopics.js";
import styles from "./BigSisHome.module.css";

console.log("BigSisHome styles keys:", Object.keys(styles));

const BigSisHome = () => {
  const [messageId, setMessageId] = useState(2);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bigsis",
      text:
        "היי! 💜 אני כאן בשבילך. \\nאפשר לדבר על כל מה שעל הלב - בלי שיפוטיות, בלי לחץ. מה קורה איתך היום?",
      time: null,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text = input) => {
    const trimmed = (text ?? "").trim();
    if (!trimmed) return;

    const newId = messageId;

    setMessages((prev) => [
      ...prev,
      { id: newId, sender: "user", text: trimmed, time: null },
    ]);

    setMessageId((prev) => prev + 2);
    setInput("");
    setIsTyping(true);

    try {
      const data = await sendUserInput(trimmed);
      const aiText = data?.reply ?? data?.response ?? "";

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: newId + 1,
          sender: "bigsis",
          text: aiText || "לא הצלחתי לענות כרגע 😕 נסי שוב רגע 💜",
          time: null,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: newId + 1,
          sender: "bigsis",
          text: "סליחה, קרתה שגיאה. אנא נסי שוב מאוחר יותר.",
          time: null,
        },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      {/* Decorative background elements */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <span className={styles.avatarEmoji}>👩‍🦰</span>
            </div>
            <div className={styles.onlineIndicator} />
          </div>

          <h1 className={styles.heroTitle}>Big Sis</h1>
          <p className={styles.heroSubtitle}>
            מקום בטוח לדבר על כל מה שעל הלב. אני כאן להקשיב, לתמוך ולעזור - בלי שיפוטיות.
          </p>
        </div>

        {/* Chat Container */}
        <div className={styles.chatWrapper}>
          <div className={styles.chatContainer}>
            {/* Messages Area */}
            <div className={styles.messagesArea}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${
                    msg.sender === "user" ? styles.rowUser : styles.rowSis
                  }`}
                >
                  {msg.sender === "bigsis" && (
                    <div className={styles.messageAvatar}>👩‍🦰</div>
                  )}

                  <div
                    className={`${styles.messageBubble} ${
                      msg.sender === "user" ? styles.userBubble : styles.sisBubble
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={`${styles.messageRow} ${styles.rowSis}`}>
                  <div className={styles.messageAvatar}>👩‍🦰</div>
                  <div className={`${styles.messageBubble} ${styles.sisBubble}`}>
                    <div className={styles.typingIndicator}>
                      <span className={styles.typingDot} />
                      <span className={`${styles.typingDot} ${styles.typingDot2}`} />
                      <span className={`${styles.typingDot} ${styles.typingDot3}`} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Topics */}
            {messages.length <= 1 && (
              <div className={styles.quickTopics}>
                <p className={styles.quickTopicsLabel}>או בחרי נושא:</p>

                <div className={styles.quickTopicsGrid}>
                  {QUICK_TOPICS.map((topic, index) => (
                    <button
                      key={index}
                      className={styles.quickTopicBtn}
                      onClick={() => handleSend(topic.message)}
                    >
                      <span className={styles.quickTopicEmoji}>{topic.emoji}</span>
                      <span className={styles.quickTopicLabelText}>{topic.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className={styles.inputArea}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="כתוב/י משהו..."
                  className={styles.input}
                  dir="rtl"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  className={styles.sendBtn}
                  disabled={!input.trim()}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>

              <p className={styles.disclaimer}>🔒 השיחה שלך פרטית ובטוחה</p>
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div className={styles.safetyNote}>
          <div className={styles.safetyIcon}>🛡️</div>
          <p className={styles.safetyText}>
            <strong>במצב חירום ?  </strong> אם את במצוקה או מחשבות על פגיעה עצמית, פני
            לער&quot;ן - קו הסיוע הארצי:{" "}
            <a href="tel:1201" className={styles.safetyLink}>
              1201
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default BigSisHome;
