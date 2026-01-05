import React, { useState, useEffect } from 'react';
import config from '../config';

const API_URL = config.API_URL;

const UserDashboard = ({ onNavigate, onLogout }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      onNavigate('home');
      return;
    }
    fetchUserData(token);
    fetchAppointments(token);
  }, [onNavigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        onNavigate('home');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchAppointments = async (token) => {
    try {
      const response = await fetch(`${API_URL}/appointments/my-appointments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/appointments/${id}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchAppointments(token);
      }
    } catch (error) {
      console.error('Error cancelling:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#10b981';
      case 'completed': return '#6366f1';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'pending': return '#fef3c7';
      case 'confirmed': return '#d1fae5';
      case 'completed': return '#e0e7ff';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const filterAppointments = () => {
    const now = new Date();
    switch (activeTab) {
      case 'upcoming':
        return appointments.filter(a => 
          new Date(a.appointmentDate) >= now && a.status !== 'cancelled'
        );
      case 'past':
        return appointments.filter(a => 
          new Date(a.appointmentDate) < now || a.status === 'completed'
        );
      case 'cancelled':
        return appointments.filter(a => a.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef2f2 0%, #fff 50%, #fef7f7 100%)',
      padding: isMobile ? '1rem' : '2rem',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      background: 'white',
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: '1rem',
    },
    avatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '700',
    },
    userName: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: '700',
      color: '#333',
      margin: '0 0 0.25rem',
    },
    userEmail: {
      color: '#666',
      fontSize: '0.9rem',
    },
    headerButtons: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    btnOutline: {
      background: 'transparent',
      color: '#666',
      padding: '0.75rem 1.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
    },
    tabs: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      background: 'white',
      padding: '0.5rem',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    },
    tab: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    tabActive: {
      background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
      color: 'white',
    },
    tabInactive: {
      background: 'transparent',
      color: '#666',
    },
    appointmentCard: {
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '1.25rem' : '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '1.5rem',
      alignItems: isMobile ? 'flex-start' : 'center',
    },
    dateBox: {
      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      borderRadius: '12px',
      padding: '1rem 1.25rem',
      textAlign: 'center',
      minWidth: '100px',
    },
    dateDay: {
      fontSize: '1.75rem',
      fontWeight: '800',
      color: '#c41e3a',
      lineHeight: 1,
    },
    dateMonth: {
      fontSize: '0.85rem',
      color: '#666',
      marginTop: '0.25rem',
    },
    appointmentDetails: {
      flex: 1,
    },
    appointmentTime: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    appointmentInfo: {
      fontSize: '0.9rem',
      color: '#666',
      marginBottom: '0.25rem',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.35rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    cardActions: {
      display: 'flex',
      gap: '0.5rem',
    },
    btnSmall: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.8rem',
      fontWeight: '600',
      cursor: 'pointer',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      background: 'white',
      borderRadius: '20px',
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    emptyText: {
      color: '#666',
      fontSize: '1rem',
    },
  };

  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const filteredAppointments = filterAppointments();

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 style={styles.userName}>Welcome, {user?.name || 'User'}!</h1>
              <p style={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <div style={styles.headerButtons}>
            <button style={styles.btnPrimary} onClick={() => onNavigate('appointments')}>
              📅 Book Appointment
            </button>
            <button style={styles.btnOutline} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
          gap: '1rem', 
          marginBottom: '1.5rem' 
        }}>
          {[
            { label: 'Total', count: appointments.length, icon: '📊', color: '#6366f1' },
            { label: 'Pending', count: appointments.filter(a => a.status === 'pending').length, icon: '⏳', color: '#f59e0b' },
            { label: 'Confirmed', count: appointments.filter(a => a.status === 'confirmed').length, icon: '✅', color: '#10b981' },
            { label: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length, icon: '❌', color: '#ef4444' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.25rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: stat.color }}>{stat.count}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {['upcoming', 'past', 'cancelled'].map(tab => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.tabActive : styles.tabInactive)
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <p style={styles.emptyText}>No {activeTab} appointments found</p>
            {activeTab === 'upcoming' && (
              <button 
                style={{ ...styles.btnPrimary, marginTop: '1rem' }}
                onClick={() => onNavigate('appointments')}
              >
                Book Your First Appointment
              </button>
            )}
          </div>
        ) : (
          filteredAppointments.map(appointment => {
            const date = new Date(appointment.appointmentDate);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();

            return (
              <div key={appointment.id} style={styles.appointmentCard}>
                <div style={styles.dateBox}>
                  <div style={styles.dateDay}>{day}</div>
                  <div style={styles.dateMonth}>{month} {year}</div>
                </div>
                
                <div style={styles.appointmentDetails}>
                  <div style={styles.appointmentTime}>
                    🕐 {appointment.appointmentTime}
                    <span style={{
                      ...styles.statusBadge,
                      background: getStatusBg(appointment.status),
                      color: getStatusColor(appointment.status),
                    }}>
                      {appointment.status}
                    </span>
                  </div>
                  <p style={styles.appointmentInfo}>
                    <strong>Doctor:</strong> {appointment.preferredDoctor}
                  </p>
                  {appointment.healthConcern && (
                    <p style={styles.appointmentInfo}>
                      <strong>Concern:</strong> {appointment.healthConcern}
                    </p>
                  )}
                </div>

                {appointment.status === 'pending' && (
                  <div style={styles.cardActions}>
                    <button 
                      style={{ ...styles.btnSmall, background: '#fee2e2', color: '#dc2626' }}
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
