import styles from "./Chat.module.css";

export default function Chat() {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => alert("Chat works 💗")}
      >
        Pink Chat Button
      </button>
    </div>
  );
}