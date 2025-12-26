import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="left">
        <h1 className="title">Big Sis</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/content">Content</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      <div className="right">
        <button type="button">🌍 Language</button>
        <button type="button">Log in</button>
      </div>
    </header>
  );
}
