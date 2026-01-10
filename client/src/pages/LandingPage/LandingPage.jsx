import { useState } from 'react';
import { Link } from 'react-router';

// Landing Page for Big Sis - Main entry point with navigation to all features
// Aesthetic: Warm, safe, nurturing with soft gradients and friendly illustrations

const BigSisLanding = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 'chat',
      icon: '💬',
      title: 'לדבר עם Big Sis',
      description: 'מקום בטוח לשתף, לשאול ולקבל תמיכה - בלי שיפוטיות',
      color: 'linear-gradient(135deg, #a855f7, #ec4899)',
      link: '/chat',
      primary: true,
    },
    {
      id: 'content',
      icon: '📚',
      title: 'תוכן ומידע',
      description: 'מאמרים, סרטונים וטיפים בנושאים שחשובים לך',
      color: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      link: '/content',
    },
    {
      id: 'resources',
      icon: '🆘',
      title: 'עזרה ומשאבים',
      description: 'קווי סיוע, ארגונים ומקומות שיכולים לעזור',
      color: 'linear-gradient(135deg, #10b981, #14b8a6)',
      link: '/resources',
    },
    {
      id: 'community',
      icon: '🤝',
      title: 'קהילה',
      description: 'סיפורים מעוררי השראה מאחרים שעברו דברים דומים',
      color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      link: '/community',
    },
  ];

  const testimonials = [
    { text: 'הרגשתי שסוף סוף מישהו מקשיב לי בלי לשפוט', emoji: '💜' },
    { text: 'עזר לי להבין שאני לא לבד', emoji: '🌟' },
    { text: 'המקום הכי בטוח שמצאתי לדבר', emoji: '🏠' },
  ];

  return (
    <div style={styles.container}>
      {/* Background decorations */}
      <div style={styles.bgOrb1}></div>
      <div style={styles.bgOrb2}></div>
      <div style={styles.bgOrb3}></div>
      <div style={styles.bgPattern}></div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>💜</span>
          <span style={styles.logoText}>Big Sis</span>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLinkActive}>בית</Link>
          <Link to="/chat" style={styles.navLink}>Big Sis</Link>
          <Link to="/content" style={styles.navLink}>תוכן</Link>
          <Link to="/about" style={styles.navLink}>אודות</Link>
        </div>
        <div style={styles.navActions}>
          <button style={styles.langBtn}>🌐 עברית</button>
          <Link to="/login" style={styles.loginBtn}>התחברות</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroEmoji}>
            <span style={styles.mainEmoji}>👩‍🦰</span>
            <span style={styles.heartFloat1}>💜</span>
            <span style={styles.heartFloat2}>💗</span>
            <span style={styles.heartFloat3}>✨</span>
          </div>
          
          <h1 style={styles.heroTitle}>
            יש לך <span style={styles.highlight}>Big Sis</span>
            <br />שתמיד כאן בשבילך
          </h1>
          
          <p style={styles.heroSubtitle}>
            מקום בטוח לדבר על כל מה שעל הלב - על מערכות יחסים, גוף, רגשות, 
            ושאלות שקשה לשאול. בלי שיפוטיות, בלי לחץ, בקצב שלך.
          </p>

          <div style={styles.heroCta}>
            <Link to="/chat" style={styles.primaryBtn}>
              <span>💬</span>
              <span>בואי נדבר</span>
            </Link>
            <Link to="/about" style={styles.secondaryBtn}>
              <span>מה זה Big Sis?</span>
              <span>→</span>
            </Link>
          </div>

          <div style={styles.trustBadges}>
            <div style={styles.badge}>🔒 פרטי ואנונימי</div>
            <div style={styles.badge}>💜 בלי שיפוטיות</div>
            <div style={styles.badge}>🕐 24/7 זמין</div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>מה תמצאי כאן?</h2>
        
        <div style={styles.featuresGrid}>
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.link}
              style={{
                ...styles.featureCard,
                ...(feature.primary ? styles.primaryCard : {}),
                transform: hoveredCard === feature.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                boxShadow: hoveredCard === feature.id 
                  ? '0 25px 50px rgba(168, 85, 247, 0.25)' 
                  : '0 10px 40px rgba(0, 0, 0, 0.08)',
              }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                style={{
                  ...styles.featureIcon,
                  background: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
              <div style={styles.featureArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Chat Preview */}
      <section style={styles.preview}>
        <div style={styles.previewContent}>
          <div style={styles.previewText}>
            <h2 style={styles.previewTitle}>
              שיחה <span style={styles.highlight}>בטוחה</span> ותומכת
            </h2>
            <p style={styles.previewDesc}>
              Big Sis היא AI שאומן במיוחד להקשיב, לתמוך ולעזור - 
              בלי לשפוט ובלי לספר לאף אחד. היא יודעת לזהות כשמשהו לא בסדר 
              ולהפנות אותך לעזרה אמיתית כשצריך.
            </p>
            <ul style={styles.previewList}>
              <li style={styles.previewItem}>
                <span style={styles.checkIcon}>✓</span>
                מערכת בטיחות מובנית לזיהוי מצוקה
              </li>
              <li style={styles.previewItem}>
                <span style={styles.checkIcon}>✓</span>
                תשובות מותאמות אישית ורגישות
              </li>
              <li style={styles.previewItem}>
                <span style={styles.checkIcon}>✓</span>
                הפניה למשאבים ועזרה מקצועית
              </li>
            </ul>
          </div>
          
          <div style={styles.previewChat}>
            <div style={styles.chatWindow}>
              <div style={styles.chatHeader}>
                <div style={styles.chatAvatar}>👩‍🦰</div>
                <div>
                  <div style={styles.chatName}>Big Sis</div>
                  <div style={styles.chatStatus}>
                    <span style={styles.onlineDot}></span>
                    מקשיבה עכשיו
                  </div>
                </div>
              </div>
              <div style={styles.chatMessages}>
                <div style={styles.sisMessage}>
                  היי! 💜 טוב שבאת. אני כאן להקשיב - מה קורה איתך?
                </div>
                <div style={styles.userMessage}>
                  יש לי שאלה שמביכה אותי לשאול...
                </div>
                <div style={styles.sisMessage}>
                  אין פה מקום למבוכה, באמת 😊 כל שאלה לגיטימית. אני כאן בשבילך.
                </div>
              </div>
              <div style={styles.chatInput}>
                <span style={styles.chatPlaceholder}>כתבי משהו...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>מה אומרים עלינו</h2>
        <div style={styles.testimonialGrid}>
          {testimonials.map((item, index) => (
            <div key={index} style={styles.testimonialCard}>
              <span style={styles.testimonialEmoji}>{item.emoji}</span>
              <p style={styles.testimonialText}>&ldquo;{item.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Banner */}
      <section style={styles.safetyBanner}>
        <div style={styles.safetyContent}>
          <div style={styles.safetyIcon}>🛡️</div>
          <div>
            <h3 style={styles.safetyTitle}>במצב חירום?</h3>
            <p style={styles.safetyText}>
              אם את/ה במצוקה או מחשבות על פגיעה עצמית, אנחנו כאן - אבל גם חשוב לדבר עם מישהו אמיתי.
            </p>
          </div>
          <a href="tel:1201" style={styles.emergencyBtn}>
            <span>📞</span>
            <span>ער&quot;ן - 1201</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <Link to="/" style={styles.footerLogo}>
            <span style={styles.logoIcon}>💜</span>
            <span style={styles.logoText}>Big Sis</span>
          </Link>
          <div style={styles.footerLinks}>
            <Link to="/about" style={styles.footerLink}>אודות</Link>
            <Link to="/privacy" style={styles.footerLink}>פרטיות</Link>
            <Link to="/terms" style={styles.footerLink}>תנאי שימוש</Link>
            <Link to="/contact" style={styles.footerLink}>צור קשר</Link>
          </div>
          <p style={styles.footerNote}>
            💜 נבנה באהבה כדי לעזור
          </p>
        </div>
      </footer>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Heebo', sans-serif;
          direction: rtl;
        }
        
        a {
          text-decoration: none;
          color: inherit;
        }
        
        button {
          cursor: pointer;
          border: none;
          font-family: inherit;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes heartFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        ::selection {
          background: rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #fdf2f8 0%, #faf5ff 30%, #f5f3ff 60%, #fdf2f8 100%)',
    fontFamily: "'Heebo', sans-serif",
    direction: 'rtl',
    position: 'relative',
    overflow: 'hidden',
  },

  // Background elements
  bgOrb1: {
    position: 'fixed',
    top: '-200px',
    right: '-100px',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)',
    animation: 'float 15s ease-in-out infinite',
    pointerEvents: 'none',
    zIndex: 0,
  },
  bgOrb2: {
    position: 'fixed',
    bottom: '-100px',
    left: '-200px',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
    animation: 'float 18s ease-in-out infinite reverse',
    pointerEvents: 'none',
    zIndex: 0,
  },
  bgOrb3: {
    position: 'fixed',
    top: '40%',
    left: '20%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
    animation: 'float 20s ease-in-out infinite',
    pointerEvents: 'none',
    zIndex: 0,
  },
  bgPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)`,
    pointerEvents: 'none',
    zIndex: 0,
  },

  // Navigation
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 50px',
    position: 'relative',
    zIndex: 100,
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    fontSize: '26px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '36px',
  },
  navLink: {
    color: '#6b7280',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    padding: '8px 0',
  },
  navLinkActive: {
    color: '#a855f7',
    fontSize: '15px',
    fontWeight: '600',
    borderBottom: '2px solid #a855f7',
    padding: '8px 0',
  },
  navActions: {
    display: 'flex',
    gap: '12px',
  },
  langBtn: {
    padding: '10px 18px',
    borderRadius: '20px',
    background: 'transparent',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
  },
  loginBtn: {
    padding: '10px 24px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
  },

  // Hero Section
  hero: {
    padding: '60px 50px 80px',
    position: 'relative',
    zIndex: 10,
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease-out',
  },
  heroEmoji: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '30px',
  },
  mainEmoji: {
    fontSize: '100px',
    display: 'block',
    filter: 'drop-shadow(0 10px 30px rgba(168, 85, 247, 0.3))',
  },
  heartFloat1: {
    position: 'absolute',
    top: '-10px',
    right: '-30px',
    fontSize: '28px',
    animation: 'heartFloat 3s ease-in-out infinite',
  },
  heartFloat2: {
    position: 'absolute',
    bottom: '10px',
    left: '-25px',
    fontSize: '22px',
    animation: 'heartFloat 3s ease-in-out infinite 0.5s',
  },
  heartFloat3: {
    position: 'absolute',
    top: '20px',
    left: '-40px',
    fontSize: '20px',
    animation: 'heartFloat 3s ease-in-out infinite 1s',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '800',
    color: '#1f2937',
    lineHeight: '1.2',
    marginBottom: '24px',
  },
  highlight: {
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#6b7280',
    lineHeight: '1.8',
    maxWidth: '650px',
    margin: '0 auto 40px',
  },
  heroCta: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '18px 36px',
    borderRadius: '30px',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    boxShadow: '0 8px 30px rgba(168, 85, 247, 0.4)',
    transition: 'all 0.3s ease',
  },
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 32px',
    borderRadius: '30px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    color: '#6b7280',
    fontSize: '17px',
    fontWeight: '500',
    border: '2px solid rgba(168, 85, 247, 0.2)',
    transition: 'all 0.3s ease',
  },
  trustBadges: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    padding: '10px 20px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid rgba(168, 85, 247, 0.1)',
  },

  // Features Section
  features: {
    padding: '60px 50px 80px',
    position: 'relative',
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '50px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  primaryCard: {
    gridColumn: 'span 2',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))',
    border: '2px solid rgba(168, 85, 247, 0.2)',
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginBottom: '20px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '10px',
  },
  featureDesc: {
    fontSize: '15px',
    color: '#6b7280',
    lineHeight: '1.6',
  },
  featureArrow: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    color: '#a855f7',
    opacity: 0.5,
    transition: 'all 0.3s ease',
  },

  // Preview Section
  preview: {
    padding: '80px 50px',
    background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.03), transparent)',
    position: 'relative',
    zIndex: 10,
  },
  previewContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
  },
  previewText: {
    paddingLeft: '20px',
  },
  previewTitle: {
    fontSize: '38px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '20px',
    lineHeight: '1.3',
  },
  previewDesc: {
    fontSize: '17px',
    color: '#6b7280',
    lineHeight: '1.8',
    marginBottom: '30px',
  },
  previewList: {
    listStyle: 'none',
  },
  previewItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    color: '#4b5563',
    marginBottom: '16px',
  },
  checkIcon: {
    color: '#10b981',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  previewChat: {
    perspective: '1000px',
  },
  chatWindow: {
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 80px rgba(168, 85, 247, 0.2)',
    overflow: 'hidden',
    transform: 'rotateY(-5deg) rotateX(5deg)',
    transition: 'transform 0.3s ease',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    color: 'white',
  },
  chatAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
  },
  chatName: {
    fontWeight: '600',
    fontSize: '16px',
  },
  chatStatus: {
    fontSize: '13px',
    opacity: 0.9,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  onlineDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
  },
  chatMessages: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minHeight: '200px',
  },
  sisMessage: {
    alignSelf: 'flex-end',
    background: '#f3f4f6',
    padding: '14px 18px',
    borderRadius: '18px 18px 6px 18px',
    fontSize: '15px',
    color: '#374151',
    maxWidth: '85%',
    lineHeight: '1.5',
  },
  userMessage: {
    alignSelf: 'flex-start',
    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
    padding: '14px 18px',
    borderRadius: '18px 18px 18px 6px',
    fontSize: '15px',
    color: 'white',
    maxWidth: '85%',
    lineHeight: '1.5',
  },
  chatInput: {
    padding: '16px 20px',
    borderTop: '1px solid #f3f4f6',
  },
  chatPlaceholder: {
    color: '#9ca3af',
    fontSize: '15px',
  },

  // Testimonials
  testimonials: {
    padding: '60px 50px 80px',
    position: 'relative',
    zIndex: 10,
  },
  testimonialGrid: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  testimonialCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '28px',
    textAlign: 'center',
    flex: '1 1 280px',
    maxWidth: '320px',
    border: '1px solid rgba(168, 85, 247, 0.1)',
  },
  testimonialEmoji: {
    fontSize: '36px',
    marginBottom: '16px',
    display: 'block',
  },
  testimonialText: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.7',
    fontStyle: 'italic',
  },

  // Safety Banner
  safetyBanner: {
    padding: '0 50px 60px',
    position: 'relative',
    zIndex: 10,
  },
  safetyContent: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '28px 36px',
    background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.8), rgba(254, 215, 170, 0.6))',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '1px solid rgba(251, 191, 36, 0.3)',
  },
  safetyIcon: {
    fontSize: '40px',
    flexShrink: 0,
  },
  safetyTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#92400e',
    marginBottom: '4px',
  },
  safetyText: {
    fontSize: '15px',
    color: '#a16207',
    lineHeight: '1.6',
  },
  emergencyBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    borderRadius: '30px',
    background: '#f59e0b',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
    marginRight: 'auto',
  },

  // Footer
  footer: {
    padding: '40px 50px',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(168, 85, 247, 0.1)',
    position: 'relative',
    zIndex: 10,
  },
  footerContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  footerLinks: {
    display: 'flex',
    gap: '28px',
  },
  footerLink: {
    color: '#6b7280',
    fontSize: '14px',
    transition: 'color 0.2s ease',
  },
  footerNote: {
    color: '#9ca3af',
    fontSize: '14px',
  },
};

export default BigSisLanding;