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

const getStyles = (isMobile, isTablet) => ({
  // Hero Section
  heroSection: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    padding: isMobile ? '2.5rem 1.5rem' : '4rem 2rem',
    textAlign: 'center',
    color: '#ffffff',
  },
  heroTitle: {
    fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: isMobile ? '1rem' : '1.2rem',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
  },
  
  // Main Content
  mainContent: {
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
    background: '#f8f9fa',
    minHeight: '100vh',
  },
  
  // Category Tabs
  categoryTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? '0.5rem' : '1rem',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    justifyContent: 'center',
  },
  categoryTab: {
    padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
    border: '2px solid #c41e3a',
    background: '#ffffff',
    color: '#c41e3a',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: isMobile ? '0.85rem' : '1rem',
    transition: 'all 0.3s ease',
  },
  categoryTabActive: {
    background: '#c41e3a',
    color: '#ffffff',
  },
  
  // FAQ Grid
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: isMobile ? '1rem' : '1.5rem',
  },
  
  // FAQ Card
  faqCard: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    border: '1px solid #eee',
  },
  faqCardOpen: {
    boxShadow: '0 8px 30px rgba(196, 30, 58, 0.15)',
    borderColor: '#c41e3a',
  },
  
  // Question Header
  faqQuestion: {
    padding: isMobile ? '1rem 1.25rem' : '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    gap: isMobile ? '0.75rem' : '1rem',
  },
  questionNumber: {
    width: isMobile ? '32px' : '40px',
    height: isMobile ? '32px' : '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: isMobile ? '0.75rem' : '0.9rem',
    flexShrink: 0,
  },
  questionText: {
    flex: 1,
    fontSize: isMobile ? '0.95rem' : '1.1rem',
    fontWeight: 600,
    color: '#333333',
    lineHeight: 1.4,
  },
  toggleIcon: {
    width: isMobile ? '30px' : '36px',
    height: isMobile ? '30px' : '36px',
    borderRadius: '50%',
    background: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#c41e3a',
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  },
  toggleIconOpen: {
    background: '#c41e3a',
    color: '#ffffff',
    transform: 'rotate(45deg)',
  },
  
  // Answer
  faqAnswer: {
    padding: isMobile ? '0 1.25rem 1.25rem 1.25rem' : '0 2rem 2rem 2rem',
    paddingLeft: isMobile ? '1.25rem' : '5rem',
    color: '#555555',
    lineHeight: 1.8,
    fontSize: isMobile ? '0.9rem' : '1rem',
    borderTop: '1px solid #f0f0f0',
    paddingTop: isMobile ? '1rem' : '1.5rem',
    background: '#fafafa',
  },
  
  // Contact Section
  contactSection: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    padding: isMobile ? '2.5rem 1.5rem' : '4rem 2rem',
    marginTop: isMobile ? '2rem' : '3rem',
  },
  contactWrapper: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: isMobile ? '1.5rem' : '2rem',
    alignItems: 'center',
  },
  contactText: {
    color: '#ffffff',
    textAlign: isMobile ? 'center' : 'left',
  },
  contactTextH3: {
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#ffffff',
  },
  contactTextP: {
    opacity: 0.9,
    fontSize: isMobile ? '0.95rem' : '1.1rem',
    lineHeight: 1.6,
    color: '#ffffff',
  },
  contactCards: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  contactCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    padding: isMobile ? '1rem 1.5rem' : '1.5rem 2rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: isMobile ? 'none' : '1 1 200px',
  },
  contactIcon: {
    fontSize: isMobile ? '1.5rem' : '2rem',
  },
  contactInfo: {
    color: '#ffffff',
  },
  contactLabel: {
    fontSize: '0.85rem',
    opacity: 0.8,
    marginBottom: '0.25rem',
    color: '#ffffff',
  },
  contactValue: {
    fontSize: isMobile ? '0.95rem' : '1.1rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  
  // Stats Section
  statsSection: {
    background: '#ffffff',
    padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
    borderBottom: '1px solid #eee',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: isMobile ? '1rem' : '2rem',
    textAlign: 'center',
  },
  statItem: {
    padding: isMobile ? '0.5rem' : '1rem',
  },
  statNumber: {
    fontSize: isMobile ? '1.75rem' : '2.5rem',
    fontWeight: 700,
    color: '#c41e3a',
    marginBottom: '0.5rem',
  },
  statLabel: {
    color: '#666666',
    fontSize: isMobile ? '0.85rem' : '1rem',
  },
});

const faqData = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is homeopathy?',
        a: 'Homeopathy is a natural system of medicine founded in the late 18th century. It works on the principle of "like cures like" - a substance that causes symptoms in a healthy person can cure similar symptoms in a sick person when given in very small doses. Homeopathic medicines stimulate the body\'s own healing mechanisms.'
      },
      {
        q: 'Is homeopathy safe?',
        a: 'Yes, homeopathic medicines are completely safe when prescribed by a qualified practitioner. They are made from natural substances and are highly diluted, making them free from toxic side effects. They are safe for people of all ages, including infants, pregnant women, and the elderly.'
      },
      {
        q: 'How long does homeopathic treatment take to work?',
        a: 'The time for results varies depending on the condition. Acute conditions like fever or cold may show improvement within hours or days. Chronic conditions that have developed over years may take weeks to months for significant improvement. Dr. Rajesh Sharma will discuss expected timelines during your consultation.'
      },
      {
        q: 'Can I take homeopathic medicines along with allopathic medicines?',
        a: 'Yes, in most cases homeopathic medicines can be taken alongside conventional medicines without any interference. However, it\'s important to inform Dr. Rajesh Sharma about all medications you\'re currently taking so he can provide the best treatment plan for you.'
      }
    ]
  },
  {
    category: 'Appointments',
    questions: [
      {
        q: 'How can I book an appointment?',
        a: 'You can book an appointment through our website by clicking on "Book Appointment" button and filling out the form. Alternatively, you can call us directly at +91 98765 43210, +91 97654 32109 during clinic hours.'
      },
      {
        q: 'What are the clinic timings?',
        a: 'Our clinic is open Monday to Saturday from 9:00 AM to 7:00 PM. On Sundays, we operate from 10:00 AM to 2:00 PM. We recommend booking in advance to avoid waiting.'
      },
      {
        q: 'Do you offer online consultations?',
        a: 'Yes! We offer video consultations for patients who cannot visit the clinic in person. Online consultations are available at ₹400. Medicines will be couriered to your address after the consultation.'
      },
      {
        q: 'What should I bring for my first appointment?',
        a: 'Please bring any previous medical reports, test results, and a list of current medications. Also, prepare to discuss your complete medical history, lifestyle, and symptoms in detail. This helps in creating a personalized treatment plan.'
      }
    ]
  },
  {
    category: 'Treatment & Fees',
    questions: [
      {
        q: 'What is the consultation fee?',
        a: 'The consultation fee for new patients is ₹1000 for in-person visits and ₹800 for online consultations. Follow-up consultations are ₹800 for in-person and ₹800 for online. Medicines are charged separately based on the treatment prescribed.'
      },
      {
        q: 'What conditions do you treat?',
        a: 'We treat a wide range of conditions including allergies, asthma, skin disorders (eczema, psoriasis, acne), digestive problems, joint pain, arthritis, migraines, anxiety, depression, hormonal imbalances, women\'s health issues, children\'s ailments, and various chronic diseases.'
      },
      {
        q: 'How are homeopathic medicines administered?',
        a: 'Homeopathic medicines typically administered through globules & liquid drops. They are easy to take and pleasant tasting. The dosage and frequency will be prescribed based on your specific condition.'
      },
      {
        q: 'Are there any dietary restrictions during treatment?',
        a: 'Generally, you should avoid strong substances like coffee, raw onion, garlic, and mint around the time of taking medicines (30 minutes before/after). Dr. Rajesh Sharma will provide specific dietary guidelines based on your condition and prescribed medicines.'
      }
    ]
  },
  {
    category: 'About Dr. Rajesh Sharma',
    questions: [
      {
        q: 'What are Dr. Rajesh Sharma\'s qualifications?',
        a: 'Dr. Rajesh Sharma holds BHMS (Bachelor of Homeopathic Medicine and Surgery) from M.U.H.S. He has over 10+ years of clinical experience and has successfully treated more than 1,000 patients.'
      },
      {
        q: 'What is Dr. Rajesh Sharma\'s approach to treatment?',
        a: 'Dr. Rajesh Sharma follows classical homeopathy principles combined with modern diagnostic approaches. He takes a holistic view of each patient, considering their physical symptoms, mental state, lifestyle, and family history to prescribe the most suitable remedy.'
      }
    ]
  }
];

function FAQ() {
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const styles = getStyles(isMobile, isTablet);

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const categories = ['All', ...faqData.map(cat => cat.category)];
  
  const filteredFaqData = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(cat => cat.category === activeCategory);

  // Flatten questions for grid display with category tracking
  let questionCounter = 0;
  const allQuestions = filteredFaqData.flatMap((category, categoryIndex) => 
    category.questions.map((item, questionIndex) => ({
      ...item,
      categoryIndex: faqData.findIndex(c => c.category === category.category),
      questionIndex,
      globalIndex: ++questionCounter,
      category: category.category
    }))
  );

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>How Can We Help?</h1>
        <p style={styles.heroSubtitle}>
          Find answers to common questions about homeopathy, appointments, treatments, and more.
        </p>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>10+</div>
            <div style={styles.statLabel}>Years Experience</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>1,000+</div>
            <div style={styles.statLabel}>Happy Patients</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>50+</div>
            <div style={styles.statLabel}>Conditions Treated</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>95%</div>
            <div style={styles.statLabel}>Success Rate</div>
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section style={styles.mainContent}>
        {/* Category Tabs */}
        <div style={styles.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category}
              style={activeCategory === category 
                ? { ...styles.categoryTab, ...styles.categoryTabActive } 
                : styles.categoryTab}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div style={styles.faqGrid}>
          {allQuestions.map((item) => {
            const key = `${item.categoryIndex}-${item.questionIndex}`;
            const isOpen = openItems[key];
            
            return (
              <div 
                key={key} 
                style={isOpen ? { ...styles.faqCard, ...styles.faqCardOpen } : styles.faqCard}
              >
                <div 
                  style={styles.faqQuestion}
                  onClick={() => toggleItem(item.categoryIndex, item.questionIndex)}
                >
                  <div style={styles.questionNumber}>
                    {String(item.globalIndex).padStart(2, '0')}
                  </div>
                  <div style={styles.questionText}>{item.q}</div>
                  <div style={isOpen ? { ...styles.toggleIcon, ...styles.toggleIconOpen } : styles.toggleIcon}>
                    +
                  </div>
                </div>
                {isOpen && (
                  <div style={styles.faqAnswer}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.contactSection}>
        <div style={styles.contactWrapper}>
          <div style={styles.contactText}>
            <h3 style={styles.contactTextH3}>Still Have Questions?</h3>
            <p style={styles.contactTextP}>
              Can't find what you're looking for? Our team is here to help. 
              Reach out to us through any of the following channels.
            </p>
          </div>
          <div style={styles.contactCards}>
            <div style={styles.contactCard}>
              <span style={styles.contactIcon}>📞</span>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>Call Us</div>
                <div style={styles.contactValue}>+91 98765 43210, +91 97654 32109</div>
              </div>
            </div>
            <div style={styles.contactCard}>
              <span style={styles.contactIcon}>📧</span>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>Email Us</div>
                <div style={styles.contactValue}>dr.rajeshsharma@gmail.com</div>
              </div>
            </div>
            <div style={styles.contactCard}>
              <span style={styles.contactIcon}>📍</span>
              <div style={styles.contactInfo}>
                <div style={styles.contactLabel}>Address</div>
                <div style={styles.contactValue}>215 Medic Avenue, New Delhi - 110015, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
