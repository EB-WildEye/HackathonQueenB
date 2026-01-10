import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import sendUserInput from "../../services/chatService.js";
/* ~~~ Warm, supportive chat interface for "Big Sis" - a safe space to talk ~~~ */

const BigSisHome = () => {
  const [messageId, setMessageId] = useState(2);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bigsis",
      text:
        "היי! 💜 אני כאן בשבילך. אפשר לדבר על כל מה שעל הלב - בלי שיפוטיות, בלי לחץ. מה קורה איתך היום?",
      time: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickTopics = [
    { emoji: "😔", label: "מרגישה לא טוב", message: "אני לא מרגישה טוב היום..." },
    { emoji: "😰", label: "לחץ או חרדה", message: "אני מרגישה הרבה לחץ לאחרונה" },
    { emoji: "💭", label: "צריכה עצה", message: "אני צריכה עצה לגבי משהו" },
    { emoji: "💬", label: "סתם לדבר", message: "רציתי סתם לדבר עם מישהו" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    const trimmed = (text ?? "").trim();
    if (!trimmed) return;

    const newId = messageId;

    const userMessage = {
      id: newId,
      sender: "user",
      text: trimmed,
      time: null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageId((prev) => prev + 2);
    setInput("");
    setIsTyping(true);

    try {
      /*
        sendUserInput() should return ONLY payload (recommended):
        { reply: "..." }  OR older: { response: "..." }
      */
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

  const handleQuickTopic = (message) => {
    handleSend(message);
  };

  return (
    <div style={styles.container}>
      {/* Decorative background elements */}
      <div style={styles.bgOrb1}></div>
      <div style={styles.bgOrb2}></div>
      <div style={styles.bgOrb3}></div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>💜</span>
          <span style={styles.logoText}>Big Sis</span>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/chat" style={styles.navLinkActive}>
            Big Sis
          </Link>
          <Link to="/content" style={styles.navLink}>
            תוכן
          </Link>
          <Link to="/about" style={styles.navLink}>
            אודות
          </Link>
        </div>
        <div style={styles.navActions}>
          <button style={styles.langBtn}>🌐 עברית</button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              <span style={styles.avatarEmoji}>👩‍🦰</span>
            </div>
            <div style={styles.onlineIndicator}></div>
          </div>
          <h1 style={styles.heroTitle}>היי, זה Big Sis שלך</h1>
          <p style={styles.heroSubtitle}>
            מקום בטוח לדבר על כל מה שעל הלב. אני כאן להקשיב, לתמוך ולעזור - בלי שיפוטיות.
          </p>
        </div>

        {/* Chat Container */}
        <div style={styles.chatWrapper}>
          <div style={styles.chatContainer}>
            {/* Messages Area */}
            <div style={styles.messagesArea}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.messageRow,
                    justifyContent: msg.sender === "user" ? "flex-start" : "flex-end",
                  }}
                >
                  {msg.sender === "bigsis" && <div style={styles.messageAvatar}>👩‍🦰</div>}
                  <div
                    style={{
                      ...styles.messageBubble,
                      ...(msg.sender === "user" ? styles.userBubble : styles.sisBubble),
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ ...styles.messageRow, justifyContent: "flex-end" }}>
                  <div style={styles.messageAvatar}>👩‍🦰</div>
                  <div style={{ ...styles.messageBubble, ...styles.sisBubble }}>
                    <div style={styles.typingIndicator}>
                      <span style={styles.typingDot}></span>
                      <span style={{ ...styles.typingDot, animationDelay: "0.2s" }}></span>
                      <span style={{ ...styles.typingDot, animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Topics */}
            {messages.length <= 1 && (
              <div style={styles.quickTopics}>
                <p style={styles.quickTopicsLabel}>או בחרי נושא:</p>
                <div style={styles.quickTopicsGrid}>
                  {quickTopics.map((topic, index) => (
                    <button
                      key={index}
                      style={styles.quickTopicBtn}
                      onClick={() => handleQuickTopic(topic.message)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(168, 85, 247, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 15px rgba(168, 85, 247, 0.15)";
                      }}
                    >
                      <span style={styles.quickTopicEmoji}>{topic.emoji}</span>
                      <span style={styles.quickTopicLabel}>{topic.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div style={styles.inputArea}>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="כתוב/י משהו..."
                  style={styles.input}
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  style={styles.sendBtn}
                  disabled={!input.trim()}
                  onMouseEnter={(e) => {
                    if (input.trim()) e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
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
              <p style={styles.disclaimer}>🔒 השיחה שלך פרטית ובטוחה</p>
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div style={styles.safetyNote}>
          <div style={styles.safetyIcon}>🛡️</div>
          <p style={styles.safetyText}>
            <strong>במצב חירום?</strong> אם את במצוקה או מחשבות על פגיעה עצמית, פני
            לער&quot;ן - קו הסיוע הארצי:{" "}
            <a href="tel:1201" style={styles.safetyLink}>
              1201
            </a>
          </p>
        </div>
      </main>

      {/* Keyframe animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Rubik:wght@400;500;600&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Heebo', 'Rubik', sans-serif; direction: rtl; }

        input:focus { outline: none; }

        button { cursor: pointer; border: none; background: none; }

        a { text-decoration: none; }

        ::selection { background: rgba(168, 85, 247, 0.3); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #f0f9ff 100%)",
    fontFamily: "'Heebo', 'Rubik', sans-serif",
    direction: "rtl",
    position: "relative",
    overflow: "hidden",
  },

  bgOrb1: {
    position: "fixed",
    top: "-10%",
    right: "-5%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, transparent 70%)",
    animation: "float 8s ease-in-out infinite",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "fixed",
    bottom: "10%",
    left: "-10%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
    animation: "float 10s ease-in-out infinite reverse",
    pointerEvents: "none",
  },
  bgOrb3: {
    position: "fixed",
    top: "50%",
    right: "30%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(251, 207, 232, 0.3) 0%, transparent 70%)",
    animation: "float 12s ease-in-out infinite",
    pointerEvents: "none",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    position: "relative",
    zIndex: 10,
  },
  logo: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: { fontSize: "28px" },
  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #a855f7, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  navLinks: { display: "flex", gap: "32px" },
  navLink: { color: "#6b7280", fontSize: "15px", fontWeight: "500", transition: "color 0.2s ease" },
  navLinkActive: { color: "#a855f7", fontSize: "15px", fontWeight: "600", position: "relative" },
  navActions: { display: "flex", gap: "12px" },
  langBtn: {
    padding: "10px 20px",
    borderRadius: "25px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(168, 85, 247, 0.2)",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  main: { maxWidth: "800px", margin: "0 auto", padding: "20px 20px 40px", position: "relative", zIndex: 5 },

  hero: { textAlign: "center", marginBottom: "30px", animation: "fadeInUp 0.6s ease-out" },
  avatarContainer: { position: "relative", display: "inline-block", marginBottom: "20px" },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f9a8d4, #c084fc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 40px rgba(168, 85, 247, 0.3)",
    animation: "pulse 3s ease-in-out infinite",
  },
  avatarEmoji: { fontSize: "50px" },
  onlineIndicator: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#22c55e",
    border: "3px solid white",
    boxShadow: "0 2px 8px rgba(34, 197, 94, 0.4)",
  },
  heroTitle: { fontSize: "32px", fontWeight: "700", color: "#1f2937", marginBottom: "12px", lineHeight: "1.3" },
  heroSubtitle: { fontSize: "17px", color: "#6b7280", maxWidth: "450px", margin: "0 auto", lineHeight: "1.7" },

  chatWrapper: { animation: "fadeInUp 0.6s ease-out 0.2s both" },
  chatContainer: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    boxShadow: "0 20px 60px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
    overflow: "hidden",
  },

  messagesArea: {
    padding: "24px",
    minHeight: "250px",
    maxHeight: "350px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  messageRow: { display: "flex", alignItems: "flex-end", gap: "10px" },
  messageAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f9a8d4, #c084fc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: "14px 18px",
    borderRadius: "20px",
    fontSize: "15px",
    lineHeight: "1.6",
    animation: "fadeInUp 0.3s ease-out",
  },
  userBubble: {
    background: "linear-gradient(135deg, #a855f7, #9333ea)",
    color: "white",
    borderBottomLeftRadius: "6px",
    marginLeft: "auto",
  },
  sisBubble: {
    background: "white",
    color: "#374151",
    borderBottomRightRadius: "6px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },

  typingIndicator: { display: "flex", gap: "4px", padding: "4px 0" },
  typingDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#c084fc", animation: "typingBounce 1s ease-in-out infinite" },

  quickTopics: { padding: "0 24px 20px", borderTop: "1px solid rgba(168, 85, 247, 0.1)", paddingTop: "20px" },
  quickTopicsLabel: { fontSize: "14px", color: "#9ca3af", marginBottom: "12px", textAlign: "center" },
  quickTopicsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" },
  quickTopicBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 18px",
    background: "white",
    borderRadius: "16px",
    border: "1px solid rgba(168, 85, 247, 0.15)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(168, 85, 247, 0.1)",
  },
  quickTopicEmoji: { fontSize: "22px" },
  quickTopicLabel: { fontSize: "14px", fontWeight: "500", color: "#4b5563" },

  inputArea: { padding: "20px 24px 24px", borderTop: "1px solid rgba(168, 85, 247, 0.1)" },
  inputWrapper: { display: "flex", gap: "12px", alignItems: "center" },
  input: {
    flex: 1,
    padding: "16px 22px",
    fontSize: "15px",
    border: "2px solid rgba(168, 85, 247, 0.15)",
    borderRadius: "25px",
    background: "white",
    color: "#1f2937",
    transition: "all 0.2s ease",
    fontFamily: "'Heebo', sans-serif",
  },
  sendBtn: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #a855f7, #ec4899)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(168, 85, 247, 0.4)",
  },
  disclaimer: { fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "12px" },

  safetyNote: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "18px 24px",
    background: "rgba(254, 243, 199, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    marginTop: "24px",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    animation: "fadeInUp 0.6s ease-out 0.4s both",
  },
  safetyIcon: { fontSize: "24px", flexShrink: 0 },
  safetyText: { fontSize: "14px", color: "#78350f", lineHeight: "1.6" },
  safetyLink: { color: "#b45309", fontWeight: "600", textDecoration: "underline" },
};

export default BigSisHome;
