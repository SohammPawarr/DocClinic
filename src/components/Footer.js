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

const getStyles = (isMobile) => ({
  footer: {
    background: '#333333',
    color: '#ffffff',
    padding: isMobile ? '2rem 1.5rem 1rem' : '3rem 2rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: isMobile ? '1.5rem' : '2rem',
  },
  footerSection: {
    marginBottom: '1rem',
    textAlign: isMobile ? 'center' : 'left',
  },
  footerSectionH4: {
    color: '#e8536a',
    marginBottom: '1rem',
    fontSize: isMobile ? '1.1rem' : '1.2rem',
  },
  footerSectionP: {
    color: '#aaa',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
    fontSize: isMobile ? '0.9rem' : '1rem',
  },
  footerSectionUl: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerSectionLi: {
    color: '#aaa',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
    fontSize: isMobile ? '0.9rem' : '1rem',
  },
  footerSectionA: {
    color: '#aaa',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: isMobile ? '1.5rem' : '2rem',
    marginTop: isMobile ? '1.5rem' : '2rem',
    borderTop: '1px solid #444',
    color: '#888',
    fontSize: isMobile ? '0.85rem' : '1rem',
  },
});

function Footer() {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const styles = getStyles(isMobile);

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionH4}>🏥 Dr. Rajesh Sharma's Clinic</h4>
          <p style={styles.footerSectionP}>
            Providing holistic homeopathic treatment for over 10 years. 
            We believe in treating the root cause, not just symptoms.
          </p>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionH4}>📍 Clinic Address</h4>
          <p style={styles.footerSectionP}>215 Medic Avenue</p>
          <p style={styles.footerSectionP}>New Delhi - 110015, India</p>
          <a 
            href="https://maps.app.goo.gl/delhiclinicmaps" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
              padding: '0.5rem 1rem',
              background: '#c41e3a',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: 600,
              transition: 'background 0.3s',
            }}
          >
            📍 Get Directions
          </a>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerSectionH4}>📞 Contact Us</h4>
          <ul style={styles.footerSectionUl}>
            <li style={styles.footerSectionLi}>📱 Phone: +91 98765 43210, +91 97654 32109</li>
            <li style={styles.footerSectionLi}>📧 Email: drsharma@gmail.com</li>
            <li style={styles.footerSectionLi}>⏰ Mon-Sat: 9AM - 1PM, 2:30PM - 9PM</li>
          </ul>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p>© 2025 Dr. Rajesh Sharma's Homeopathic Clinic. All rights reserved.</p>
        <p>Disclaimer: Results may vary. Consult for personalized treatment.</p>
      </div>
    </footer>
  );
}

export default Footer;
