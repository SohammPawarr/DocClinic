import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import FAQ from './pages/FAQ';
import UserDashboard from './pages/UserDashboard';
import Login from './components/Login';
import Chatbot from './components/Chatbot';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'appointments':
        return <Appointments isLoggedIn={isLoggedIn} user={user} onLoginRequired={() => setShowLogin(true)} />;
      case 'faq':
        return <FAQ />;
      case 'dashboard':
        return <UserDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />;
      default:
        return <Home onBookAppointment={() => setCurrentPage('appointments')} />;
    }
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      <Chatbot />
    </div>
  );
}

export default App;
