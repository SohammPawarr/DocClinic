import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import config from '../config';

const API_URL = config.API_URL;

// Custom hook for responsive design
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const getStyles = (isMobile) => ({
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: isMobile ? 'flex-end' : 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  modalContent: {
    background: '#ffffff',
    padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
    borderRadius: isMobile ? '20px 20px 0 0' : '15px',
    width: isMobile ? '100%' : '90%',
    maxWidth: '450px',
    position: 'relative',
    maxHeight: isMobile ? '90vh' : 'auto',
    overflowY: 'auto',
    textAlign: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666666',
    padding: '0.25rem',
  },
  modalTitle: {
    color: '#c41e3a',
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: 700,
  },
  modalSubtitle: {
    color: '#666',
    fontSize: isMobile ? '0.9rem' : '1rem',
    marginBottom: isMobile ? '2rem' : '2.5rem',
    lineHeight: 1.5,
  },
  googleBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  errorMessage: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '8px',
    marginTop: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  features: {
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e0e0e0',
    textAlign: 'left',
  },
  featureTitle: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 600,
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    fontSize: '0.9rem',
    color: '#333',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  featureIcon: {
    color: '#c41e3a',
    fontSize: '1rem',
  },
});

function Login({ onClose, onLogin }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const styles = getStyles(isMobile);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setApiError('');

    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Call onLogin with user data
      onLogin({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || '',
        id: data.user.id
      });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setApiError('Google sign-in failed. Please try again.');
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        
        <h2 style={styles.modalTitle}>Welcome to DocClinic</h2>
        <p style={styles.modalSubtitle}>
          Sign in with your Google account to book appointments and access your health records
        </p>

        {apiError && (
          <div style={styles.errorMessage}>
            {apiError}
          </div>
        )}

        {/* Google Sign-In Button */}
        <div style={styles.googleBtnWrapper}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_blue"
            size="large"
            text="continue_with"
            shape="rectangular"
            width={isMobile ? 280 : 320}
            disabled={loading}
          />
        </div>

        {loading && (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Signing you in...
          </p>
        )}

        <div style={styles.features}>
          <div style={styles.featureTitle}>Why Sign In?</div>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>Quick & easy appointment booking</span>
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>View your appointment history</span>
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>Secure & encrypted data</span>
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureIcon}>✓</span>
              <span>No password to remember</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
