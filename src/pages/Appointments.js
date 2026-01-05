import React, { useState, useEffect } from 'react';
import config from '../config';

const API_URL = config.API_URL;

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

const getStyles = (isMobile, isTablet) => ({
  // Main container - full height, no scroll
  pageContainer: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    background: '#f8f9fa',
  },
  
  // Left Panel - Info Section
  leftPanel: {
    flex: isMobile ? 'none' : '0 0 35%',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    padding: isMobile ? '1.5rem' : '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#ffffff',
  },
  leftTitle: {
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    lineHeight: 1.2,
  },
  leftSubtitle: {
    fontSize: isMobile ? '0.85rem' : '0.95rem',
    opacity: 0.9,
    marginBottom: isMobile ? '1rem' : '1.5rem',
    lineHeight: 1.5,
  },
  infoCards: {
    display: 'flex',
    flexDirection: isMobile ? 'row' : 'column',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
    gap: '0.75rem',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    padding: isMobile ? '0.6rem 0.75rem' : '0.75rem 1rem',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: isMobile ? '1 1 calc(50% - 0.375rem)' : 'none',
  },
  infoIcon: {
    fontSize: isMobile ? '1rem' : '1.2rem',
    width: isMobile ? '32px' : '40px',
    height: isMobile ? '32px' : '40px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: isMobile ? '0.65rem' : '0.75rem',
    opacity: 0.8,
    marginBottom: '0.1rem',
  },
  infoValue: {
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    fontWeight: 600,
  },
  
  // Right Panel - Form Section
  rightPanel: {
    flex: '1',
    padding: isMobile ? '1.5rem' : '1.5rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formHeader: {
    marginBottom: '0.75rem',
  },
  formTitle: {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.25rem',
  },
  formSubtitle: {
    color: '#666',
    fontSize: isMobile ? '0.8rem' : '0.85rem',
  },
  
  // Form Grid
  formGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: '0.75rem',
  },
  formGroupFull: {
    gridColumn: isMobile ? '1' : '1 / -1',
  },
  formGroup: {
    marginBottom: '0',
  },
  formLabel: {
    display: 'block',
    marginBottom: '0.25rem',
    color: '#333333',
    fontWeight: 600,
    fontSize: '0.8rem',
  },
  formInput: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '0.9rem',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    background: '#ffffff',
  },
  formInputFocus: {
    borderColor: '#c41e3a',
    outline: 'none',
  },
  
  // Consultation Type Cards
  consultationTypes: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '0.75rem',
  },
  consultationCard: {
    flex: 1,
    padding: '0.6rem 0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s',
    background: '#ffffff',
  },
  consultationCardActive: {
    borderColor: '#c41e3a',
    background: '#fff5f7',
  },
  consultationIcon: {
    fontSize: '1.2rem',
  },
  consultationLabel: {
    fontWeight: 600,
    color: '#333',
    fontSize: '0.85rem',
  },
  consultationPrice: {
    color: '#c41e3a',
    fontWeight: 700,
    fontSize: '0.85rem',
    marginLeft: 'auto',
  },
  
  // Submit Button
  submitBtn: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '0.75rem',
  },
  
  // Login Prompt
  loginContainer: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    padding: isMobile ? '1.5rem' : '2rem',
  },
  loginCard: {
    background: '#ffffff',
    padding: isMobile ? '2rem 1.5rem' : '3rem',
    borderRadius: '20px',
    textAlign: 'center',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  loginIcon: {
    fontSize: isMobile ? '3rem' : '4rem',
    marginBottom: '1rem',
  },
  loginTitle: {
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '1rem',
  },
  loginText: {
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: '#ffffff',
    padding: isMobile ? '0.85rem 2rem' : '1rem 2.5rem',
    border: 'none',
    borderRadius: '50px',
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    width: isMobile ? '100%' : 'auto',
  },
  
  // Success Message
  successContainer: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    padding: isMobile ? '1.5rem' : '2rem',
  },
  successCard: {
    background: '#ffffff',
    padding: isMobile ? '2rem 1.5rem' : '3rem',
    borderRadius: '20px',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  successIcon: {
    fontSize: isMobile ? '3rem' : '4rem',
    marginBottom: '1rem',
  },
  successTitle: {
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.5rem',
  },
  successSubtitle: {
    color: '#666',
    marginBottom: '1.5rem',
  },
  appointmentDetails: {
    background: '#f8f9fa',
    padding: isMobile ? '1rem' : '1.5rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
  detailLabel: {
    color: '#666',
    fontSize: isMobile ? '0.85rem' : '1rem',
  },
  detailValue: {
    fontWeight: 600,
    color: '#333',
    fontSize: isMobile ? '0.85rem' : '1rem',
  },
  
  errorMessage: {
    color: '#c41e3a',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
  },
});

function Appointments({ isLoggedIn, user, onLoginRequired }) {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const styles = getStyles(isMobile, isTablet);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date: '',
    time: '',
    consultationType: 'in-person',
    condition: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
  ];

  const conditions = [
    'General Consultation',
    'Allergies & Asthma',
    'Skin Conditions',
    'Digestive Issues',
    'Joint & Muscle Pain',
    'Stress & Anxiety',
    'Children\'s Health',
    'Women\'s Health',
    'Chronic Disease',
    'Follow-up Visit',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time slot';
    if (!formData.condition) newErrors.condition = 'Please select a condition';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setApiError('');

    try {
      const token = localStorage.getItem('token');
      const endpoint = token ? '/appointments/book' : '/appointments/book-guest';
      
      const appointmentData = {
        patientName: formData.name,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        consultationType: formData.consultationType,
        healthConcern: formData.condition,
        symptoms: formData.message, // Send symptoms field
        additionalNotes: formData.message, // Keep both for compatibility
        preferredDoctor: 'Dr. Rajesh Sharma' // Default doctor
      };

      const headers = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      setSubmitted(true);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginIcon}>🔐</div>
          <h3 style={styles.loginTitle}>Login Required</h3>
          <p style={styles.loginText}>
            Please login or create an account to book an appointment. 
            This helps us maintain your appointment history and provide personalized care.
          </p>
          <button style={styles.loginBtn} onClick={onLoginRequired}>
            Login / Register
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✅</div>
          <h3 style={styles.successTitle}>Appointment Confirmed!</h3>
          <p style={styles.successSubtitle}>Thank you, {formData.name}!</p>
          
          <div style={styles.appointmentDetails}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Date</span>
              <span style={styles.detailValue}>
                {new Date(formData.date).toLocaleDateString('en-IN', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Time</span>
              <span style={styles.detailValue}>{formData.time}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Type</span>
              <span style={styles.detailValue}>
                {formData.consultationType === 'in-person' ? 'In-Person' : 'Online'}
              </span>
            </div>
            <div style={{ ...styles.detailRow, borderBottom: 'none' }}>
              <span style={styles.detailLabel}>Condition</span>
              <span style={styles.detailValue}>{formData.condition}</span>
            </div>
          </div>
          
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Confirmation sent to {formData.email}
          </p>
          
          <button 
            style={styles.loginBtn}
            onClick={() => setSubmitted(false)}
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      {/* Left Info Panel */}
      <div style={styles.leftPanel}>
        <h1 style={styles.leftTitle}>Book Your Consultation</h1>
        <p style={styles.leftSubtitle}>
          Take the first step towards natural healing. Schedule your appointment with Dr. Rajesh Sharma today.
        </p>
        
        <div style={styles.infoCards}>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>🕐</div>
            <div style={styles.infoContent}>
              <div style={styles.infoLabel}>Clinic Hours</div>
              <div style={styles.infoValue}>Mon-Sat: 9AM - 1PM, 2:30PM - 9PM</div>
            </div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>📍</div>
            <div style={styles.infoContent}>
              <div style={styles.infoLabel}>Location</div>
              <div style={styles.infoValue}>215 Medic Avenue, New Delhi - 110015, India</div>
              <a 
                href="https://maps.app.goo.gl/delhiclinicmaps" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '0.5rem',
                  padding: '0.35rem 0.75rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                📍 Get Directions
              </a>
            </div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoIcon}>📞</div>
            <div style={styles.infoContent}>
              <div style={styles.infoLabel}>Need Help?</div>
              <div style={styles.infoValue}>+91 98765 43210, +91 97654 32109</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Form Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>Fill Your Details</h2>
          <p style={styles.formSubtitle}>All fields marked with * are required</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Consultation Type Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={styles.formLabel}>Consultation Type</label>
            <div style={styles.consultationTypes}>
              <div 
                style={formData.consultationType === 'in-person' 
                  ? { ...styles.consultationCard, ...styles.consultationCardActive }
                  : styles.consultationCard}
                onClick={() => setFormData({ ...formData, consultationType: 'in-person' })}
              >
                <div style={styles.consultationIcon}>🏥</div>
                <div style={styles.consultationLabel}>In-Person Visit</div>
                <div style={styles.consultationPrice}>₹1000</div>
              </div>
              <div 
                style={formData.consultationType === 'online' 
                  ? { ...styles.consultationCard, ...styles.consultationCardActive }
                  : styles.consultationCard}
                onClick={() => setFormData({ ...formData, consultationType: 'online' })}
              >
                <div style={styles.consultationIcon}>💻</div>
                <div style={styles.consultationLabel}>Video Call</div>
                <div style={styles.consultationPrice}>₹800</div>
              </div>
            </div>
          </div>
          
          {/* Form Grid */}
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                style={styles.formInput}
              />
              {errors.name && <p style={styles.errorMessage}>{errors.name}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={handleChange}
                style={styles.formInput}
              />
              {errors.phone && <p style={styles.errorMessage}>{errors.phone}</p>}
            </div>
            
            <div style={{ ...styles.formGroup, ...styles.formGroupFull }}>
              <label style={styles.formLabel}>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                style={styles.formInput}
              />
              {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Preferred Date *</label>
              <input
                type="date"
                name="date"
                min={today}
                max={maxDateStr}
                value={formData.date}
                onChange={handleChange}
                style={styles.formInput}
              />
              {errors.date && <p style={styles.errorMessage}>{errors.date}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Time Slot *</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={styles.formInput}
              >
                <option value="">Select time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && <p style={styles.errorMessage}>{errors.time}</p>}
            </div>
            
            <div style={{ ...styles.formGroup, ...styles.formGroupFull }}>
              <label style={styles.formLabel}>Condition / Reason *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                style={styles.formInput}
              >
                <option value="">Select condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
              {errors.condition && <p style={styles.errorMessage}>{errors.condition}</p>}
            </div>
            
            <div style={{ ...styles.formGroup, ...styles.formGroupFull }}>
              <label style={styles.formLabel}>Additional Notes (Optional)</label>
              <textarea
                name="message"
                rows="2"
                placeholder="Describe your symptoms briefly..."
                value={formData.message}
                onChange={handleChange}
                style={{ ...styles.formInput, resize: 'none' }}
              />
            </div>
          </div>
          
          <button type="submit" style={styles.submitBtn}>
            Confirm Appointment → (Please Click Once)
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointments;
