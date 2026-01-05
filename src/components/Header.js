import React, { useState, useEffect } from 'react';

// Custom hook for responsive design
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const getStyles = (isMobile, mobileMenuOpen) => ({
  header: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    boxShadow: '0 4px 20px rgba(196, 30, 58, 0.3)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isMobile ? '0.6rem 1rem' : '1rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.5rem' : '1rem',
    cursor: 'pointer',
  },
  logoIcon: {
    width: isMobile ? '40px' : '60px',
    height: isMobile ? '40px' : '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'white',
    padding: '3px',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  logoTextH1: {
    color: '#ffffff',
    fontSize: isMobile ? '1rem' : '1.5rem',
    fontWeight: 700,
    margin: 0,
  },
  logoTextSpan: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: isMobile ? '0.65rem' : '0.85rem',
    display: isMobile ? 'none' : 'block',
  },
  navButtons: {
    display: isMobile ? (mobileMenuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.25rem' : '0.75rem',
    alignItems: isMobile ? 'stretch' : 'center',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '100%' : 'auto',
    left: 0,
    right: 0,
    background: isMobile ? 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)' : 'transparent',
    padding: isMobile ? '1rem' : 0,
    boxShadow: isMobile ? '0 10px 30px rgba(0, 0, 0, 0.2)' : 'none',
  },
  navBtn: {
    padding: isMobile ? '0.75rem 1rem' : '0.6rem 1.25rem',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '25px',
    transition: 'all 0.3s',
    fontWeight: 500,
    textAlign: isMobile ? 'left' : 'center',
  },
  navBtnActive: {
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.2)',
  },
  loginBtn: {
    background: 'transparent',
    color: '#ffffff',
    padding: isMobile ? '0.75rem 1rem' : '0.6rem 1.5rem',
    fontWeight: 600,
    border: '2px solid #ffffff',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s',
    marginTop: isMobile ? '0.5rem' : 0,
    marginLeft: isMobile ? 0 : '0.5rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'center',
    gap: isMobile ? '0.5rem' : '1rem',
  },
  userName: {
    color: '#ffffff',
    fontWeight: 500,
    textAlign: isMobile ? 'left' : 'center',
    padding: isMobile ? '0.5rem 1rem' : 0,
  },
  logoutBtn: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.3s',
    fontWeight: 500,
    textAlign: isMobile ? 'left' : 'center',
  },
  mobileMenuBtn: {
    display: isMobile ? 'block' : 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#ffffff',
    padding: '0.25rem',
  },
});

function Header({ currentPage, setCurrentPage, isLoggedIn, user, onLoginClick, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const styles = getStyles(isMobile, mobileMenuOpen);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const getNavBtnStyle = (page) => ({
    ...styles.navBtn,
    ...(currentPage === page ? styles.navBtnActive : {}),
  });

  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <div style={styles.logo} onClick={() => handleNavClick('home')}>
          <div style={styles.logoIcon}>
            <img src="/logo.png" alt="Dr. Sharma's Clinic Logo" style={styles.logoImg} />
          </div>
          <div>
            <h1 style={styles.logoTextH1}>Dr. Sharma's Clinic</h1>
            <span style={styles.logoTextSpan}>Homeopathic Physician</span>
          </div>
        </div>

        <button 
          style={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav style={styles.navButtons}>
          <button 
            style={getNavBtnStyle('home')}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            style={getNavBtnStyle('appointments')}
            onClick={() => handleNavClick('appointments')}
          >
            Book Appointment
          </button>
          <button 
            style={getNavBtnStyle('faq')}
            onClick={() => handleNavClick('faq')}
          >
            FAQ
          </button>

          {isLoggedIn ? (
            <div style={styles.userInfo}>
              <button 
                style={getNavBtnStyle('dashboard')}
                onClick={() => handleNavClick('dashboard')}
              >
                📊 My Appointments
              </button>
              <span style={styles.userName}>👤 {user?.name}</span>
              <button style={styles.logoutBtn} onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button style={styles.loginBtn} onClick={onLoginClick}>
              Login / Register
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
