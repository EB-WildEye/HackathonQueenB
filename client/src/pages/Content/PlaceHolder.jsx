import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ContentPlaceholder({ title, emoji = "📌" }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px 60px" }}>
      <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10 }}>
        {title} {emoji}
      </h1>

      <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: 14 }}>
        התוכן בעבודה ויתעדכן בקרוב 💜
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/chat" style={primaryBtn}>
          לדבר עם Big Sis
        </Link>
        <Link to="/" style={secondaryBtn}>
          חזרה לבית
        </Link>
      </div>
    </div>
  );
}

ContentPlaceholder.propTypes = {
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string,
};

ContentPlaceholder.defaultProps = {
  emoji: "📌",
};

const primaryBtn = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 999,
  background: "linear-gradient(135deg, #a855f7, #ec4899)",
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
};

const secondaryBtn = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(168, 85, 247, 0.25)",
  background: "rgba(255,255,255,0.85)",
  color: "#6b7280",
  textDecoration: "none",
  fontWeight: 800,
};
