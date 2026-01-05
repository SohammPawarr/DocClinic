import React, { useState, useRef, useEffect } from 'react';

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
  chatbotContainer: {
    position: 'fixed',
    bottom: isMobile ? '1rem' : '2rem',
    right: isMobile ? '1rem' : '2rem',
    zIndex: 150,
  },
  chatbotBtn: {
    width: isMobile ? '50px' : '60px',
    height: isMobile ? '50px' : '60px',
    borderRadius: '50%',
    background: '#c41e3a',
    color: '#ffffff',
    border: 'none',
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 5px 20px rgba(196, 30, 58, 0.4)',
    transition: 'transform 0.3s',
  },
  chatbotWindow: {
    position: 'fixed',
    bottom: isMobile ? 0 : '70px',
    right: isMobile ? 0 : '2rem',
    left: isMobile ? 0 : 'auto',
    width: isMobile ? '100%' : '350px',
    height: isMobile ? '100vh' : '450px',
    background: '#ffffff',
    borderRadius: isMobile ? 0 : '15px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatbotHeader: {
    background: '#c41e3a',
    color: '#ffffff',
    padding: isMobile ? '1.25rem 1rem' : '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatbotHeaderH4: {
    margin: 0,
    fontSize: isMobile ? '1.1rem' : '1rem',
  },
  chatbotClose: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: isMobile ? '1.5rem' : '1.2rem',
    cursor: 'pointer',
    padding: '0.25rem',
  },
  chatbotMessages: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  chatMessageBot: {
    padding: '0.75rem 1rem',
    borderRadius: '15px',
    maxWidth: '85%',
    wordWrap: 'break-word',
    background: '#f8f9fa',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '5px',
    fontSize: isMobile ? '0.95rem' : '1rem',
  },
  chatMessageUser: {
    padding: '0.75rem 1rem',
    borderRadius: '15px',
    maxWidth: '85%',
    wordWrap: 'break-word',
    background: '#c41e3a',
    color: '#ffffff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: '5px',
    fontSize: isMobile ? '0.95rem' : '1rem',
  },
  chatbotSuggestions: {
    padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  suggestionBtn: {
    padding: isMobile ? '0.6rem 0.85rem' : '0.5rem 0.75rem',
    border: '1px solid #c41e3a',
    background: '#ffffff',
    color: '#c41e3a',
    borderRadius: '20px',
    fontSize: isMobile ? '0.85rem' : '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  chatbotInput: {
    display: 'flex',
    padding: isMobile ? '1rem' : '1rem',
    borderTop: '1px solid #e0e0e0',
    gap: '0.5rem',
  },
  chatbotInputField: {
    flex: 1,
    padding: isMobile ? '0.85rem' : '0.75rem',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    outline: 'none',
    fontSize: isMobile ? '1rem' : '0.95rem',
  },
  chatbotInputBtn: {
    background: '#c41e3a',
    color: '#ffffff',
    border: 'none',
    width: isMobile ? '45px' : '40px',
    height: isMobile ? '45px' : '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: isMobile ? '1.1rem' : '1rem',
  },
});

const faqData = {
  'timing': 'Our clinic is open Monday to Saturday from Mon-Sat: 9AM - 1PM, 2:30PM - 9PM.',
  'time': 'Our clinic is open Monday to Saturday from Mon-Sat: 9AM - 1PM, 2:30PM - 9PM.',
  'hours': 'Our clinic is open Monday to Saturday from Mon-Sat: 9AM - 1PM, 2:30PM - 9PM.',
  'open': 'Our clinic is open Monday to Saturday from Mon-Sat: 9AM - 1PM, 2:30PM - 9PM.',
  'appointment': 'You can book an appointment through our website by clicking on "Book Appointment" or call us at +91 98765 43210, +91 97654 32109',
  'book': 'You can book an appointment through our website by clicking on "Book Appointment" or call us at +91 98765 43210, +91 97654 32109',
  'cost': 'Consultation fee is ₹1000 for new patients and ₹800 for follow-ups. Medicines are charged separately based on treatment.',
  'fee': 'Consultation fee is ₹1000 for new patients and ₹800 for follow-ups. Medicines are charged separately based on treatment.',
  'price': 'Consultation fee is ₹1000 for new patients and ₹800 for follow-ups. Medicines are charged separately based on treatment.',
  'address': 'We are located at 215 Medic Avenue, New Delhi - 110015, India',
  'location': 'We are located at 215 Medic Avenue, New Delhi - 110015, India',
  'where': 'We are located at 215 Medic Avenue, New Delhi - 110015, India',
  'homeopathy': 'Homeopathy is a natural system of medicine that uses highly diluted substances to trigger the body\'s natural healing system. It treats the whole person, not just the symptoms.',
  'what is': 'Homeopathy is a natural system of medicine that uses highly diluted substances to trigger the body\'s natural healing system. It treats the whole person, not just the symptoms.',
  'safe': 'Yes! Homeopathic medicines are completely safe with no side effects. They are suitable for all ages including infants and pregnant women.',
  'side effect': 'Homeopathic medicines have no side effects when taken as prescribed. They are gentle and work with your body\'s natural healing process.',
  'treatment': 'We treat various conditions including allergies, skin disorders, digestive issues, respiratory problems, hormonal imbalances, and chronic diseases.',
  'conditions': 'We treat various conditions including allergies, skin disorders, digestive issues, respiratory problems, hormonal imbalances, and chronic diseases.',
  'diseases': 'We treat various conditions including allergies, skin disorders, digestive issues, respiratory problems, hormonal imbalances, and chronic diseases.',
  'doctor': 'Dr. Rajesh Sharma has over 10 years of experience in homeopathy with BHMS. He has successfully treated over 10,000 patients.',
  'experience': 'Dr. Rajesh Sharma has over 10 years of experience in homeopathy with BHMS. He has successfully treated over 10,000 patients.',
  'online': 'Yes, we offer online consultations via video call. Book an online appointment through our website.',
  'video': 'Yes, we offer online consultations via video call. Book an online appointment through our website.',
  'hello': 'Hello! Welcome to Dr. Rajesh Sharma\'s Homeopathic Clinic. How can I help you today?',
  'hi': 'Hi there! Welcome to Dr. Rajesh Sharma\'s Homeopathic Clinic. How can I assist you?',
  'thanks': 'You\'re welcome! Is there anything else I can help you with?',
  'thank you': 'You\'re welcome! Feel free to ask if you have more questions.',
  'bye': 'Goodbye! Take care and stay healthy. Visit us for any health concerns!',
};

const suggestions = [
  'Clinic timing?',
  'How to book?',
  'Consultation fee?',
  'Clinic address?',
  'What is homeopathy?'
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! 👋 I\'m your virtual assistant. How can I help you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const styles = getStyles(isMobile);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [keyword, answer] of Object.entries(faqData)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }
    
    return "I'm not sure about that. Please call us at +91 98765 43210, +91 97654 32109 or visit the FAQ section for more information. You can also book an appointment to speak with Dr. Rajesh Sharma directly.";
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMessage = { text: text.trim(), isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = { text: findAnswer(text), isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      {isOpen && (
        <div style={styles.chatbotWindow}>
          <div style={styles.chatbotHeader}>
            <h4 style={styles.chatbotHeaderH4}>💬 Clinic Assistant</h4>
            <button style={styles.chatbotClose} onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div style={styles.chatbotMessages}>
            {messages.map((msg, index) => (
              <div key={index} style={msg.isBot ? styles.chatMessageBot : styles.chatMessageUser}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.chatbotSuggestions}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                style={styles.suggestionBtn}
                onClick={() => handleSend(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div style={styles.chatbotInput}>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.chatbotInputField}
            />
            <button onClick={() => handleSend()} style={styles.chatbotInputBtn}>➤</button>
          </div>
        </div>
      )}

      <button style={styles.chatbotBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default Chatbot;
