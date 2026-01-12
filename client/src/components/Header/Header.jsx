import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { BigSisContext } from "../../context/BigSisContext";
import { LANG } from "../../constants/languages";
import { deleteChatHistory, deleteUserAccount, signOut } from "../../services/userService";
import styles from "./Header.module.css";

<<<<<<< Updated upstream
=======
const COPY = {
  [LANG.HE]: {
    login: 'התחברות',
    logout: 'התנתקות',
    chat: 'בואי נדבר',
    content: 'תוכן',
    about: 'אודות',
    menuHint: 'בקרוב עוד תכנים 💜',
    terminate: 'מחיקת נתונים',
    terminateTitle: 'מחיקת נתונים',
    terminateDesc: 'פעולה זו תמחק את כל היסטוריית השיחות שלך.',
    deleteAccountOption: 'מחק גם את החשבון שלי לצמיתות',
    cancel: 'ביטול',
    confirm: 'אישור מחיקה',
    deleting: 'מוחק...',
    successHistory: 'היסטוריית השיחות נמחקה בהצלחה',
    successAccount: 'החשבון נמחק בהצלחה',
    error: 'אירעה שגיאה, נסי שוב'
  },
  [LANG.EN]: {
    login: 'Login',
    logout: 'Logout',
    chat: 'Lets chat',
    content: 'Content',
    about: 'About us',
    menuHint: 'More coming soon 💜',
    terminate: 'Delete Data',
    terminateTitle: 'Delete Data',
    terminateDesc: 'This will delete all your chat history.',
    deleteAccountOption: 'Also delete my account permanently',
    cancel: 'Cancel',
    confirm: 'Confirm Delete',
    deleting: 'Deleting...',
    successHistory: 'Chat history deleted successfully',
    successAccount: 'Account deleted successfully',
    error: 'An error occurred, please try again'
  }
};

>>>>>>> Stashed changes
const CONTENT_ITEMS = [
  { to: "/content/body", label: "דימוי גוף", emoji: "💗" },
  { to: "/content/relationships", label: "מערכות יחסים", emoji: "🤝" },
  { to: "/content/intimacy", label: "אינטימיות", emoji: "🤍" },
  { to: "/content/nutrition", label: "תזונה", emoji: "🥗" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, user } = useContext(BigSisContext);

  const t = COPY[language] || COPY[LANG.EN];

  const isContentActive = useMemo(
    () => location.pathname.startsWith("/content"),
    [location.pathname]
  );

  const toggleLanguage = () => {
    setLanguage(language === LANG.HE ? LANG.EN : LANG.HE);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleTerminate = async () => {
    setIsDeleting(true);
    try {
      if (deleteAccount) {
        await deleteUserAccount();
        alert(t.successAccount);
        navigate('/');
      } else {
        await deleteChatHistory();
        alert(t.successHistory);
      }
      setShowTerminateModal(false);
      setDeleteAccount(false);
    } catch (error) {
      console.error('Terminate error:', error);
      alert(t.error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }

    function onEsc(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setShowTerminateModal(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandIcon}>💜</span>
            <span className={styles.brandText}>BeSafe</span>
          </Link>

<<<<<<< Updated upstream
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
=======
          <nav className={styles.nav}>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {t.chat}
            </NavLink>

            <div className={styles.dropdown} ref={menuRef}>
              <button
                type="button"
                className={`${styles.navLink} ${styles.dropdownBtn} ${isContentActive ? styles.active : ""
                  } ${open ? styles.dropdownOpen : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                {t.content}
                <span className={styles.caret} aria-hidden="true">
                  ▾
                </span>
              </button>

              <div
                className={`${styles.dropdownMenu} ${open ? styles.menuOpen : styles.menuClosed
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
                    <span className={styles.itemLabel}>{language === LANG.EN ? item.labelEn : item.labelHe}</span>
                  </NavLink>
                ))}

                <div className={styles.menuHint}>{t.menuHint}</div>
              </div>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {t.about}
            </NavLink>
          </nav>

          <div className={styles.navActions}>
            <button className={styles.langBtn} type="button" onClick={toggleLanguage}>
              🌐 {language === LANG.HE ? "עברית" : "English"}
            </button>

            {user ? (
              <>
                <button
                  className={styles.terminateBtn}
                  type="button"
                  onClick={() => setShowTerminateModal(true)}
                  title={t.terminate}
                >
                  🗑️
                </button>
                <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
                  {t.logout}
                </button>
              </>
            ) : (
              <Link to="/login" className={styles.loginBtn}>
                {t.login}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Terminate Modal */}
      {showTerminateModal && (
        <div className={styles.modalOverlay} onClick={() => !isDeleting && setShowTerminateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>⚠️ {t.terminateTitle}</h2>
            <p className={styles.modalDesc}>{t.terminateDesc}</p>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={deleteAccount}
                onChange={(e) => setDeleteAccount(e.target.checked)}
                disabled={isDeleting}
              />
              <span>{t.deleteAccountOption}</span>
            </label>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowTerminateModal(false)}
                disabled={isDeleting}
              >
                {t.cancel}
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleTerminate}
                disabled={isDeleting}
              >
                {isDeleting ? t.deleting : t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
>>>>>>> Stashed changes
  );
}
