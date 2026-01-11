import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { BigSisContext } from "../../context/BigSisContext";
import { LANG } from "../../constants/languages";
import styles from "./Header.module.css";

const CONTENT_ITEMS = [
  { to: "/content/body", label: "דימוי גוף", emoji: "💗" },
  { to: "/content/relationships", label: "מערכות יחסים", emoji: "🤝" },
  { to: "/content/intimacy", label: "אינטימיות", emoji: "🤍" },
  { to: "/content/nutrition", label: "תזונה", emoji: "🥗" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { language, setLanguage } = useContext(BigSisContext);

  const isContentActive = useMemo(
    () => location.pathname.startsWith("/content"),
    [location.pathname]
  );

  const toggleLanguage = () => {
    setLanguage(language === LANG.HE ? LANG.EN : LANG.HE);
  };

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }

    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>💜</span>
          <span className={styles.brandText}>BeSafe</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Lets chat
          </NavLink>

          <div className={styles.dropdown} ref={menuRef}>
            <button
              type="button"
              className={`${styles.navLink} ${styles.dropdownBtn} ${
                isContentActive ? styles.active : ""
              } ${open ? styles.dropdownOpen : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              Content
              <span className={styles.caret} aria-hidden="true">
                ▾
              </span>
            </button>

            <div
              className={`${styles.dropdownMenu} ${
                open ? styles.menuOpen : styles.menuClosed
              }`}
              role="menu"
            >
              {CONTENT_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ""}`
                  }
                  onClick={() => setOpen(false)}
                  role="menuitem"
                >
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                  <span className={styles.itemLabel}>{item.label}</span>
                </NavLink>
              ))}

              <div className={styles.menuHint}>בקרוב עוד תכנים 💜</div>
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            About us
          </NavLink>
        </nav>

        <button className={styles.langBtn} type="button" onClick={toggleLanguage}>
          🌐 {language === LANG.HE ? "עברית" : "English"}
        </button>
      </div>
    </header>
  );
}
