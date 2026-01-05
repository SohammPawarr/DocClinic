import React, { useState, useEffect, useRef } from 'react';

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
  homePage: {
    overflowX: 'hidden',
  },
  heroSplit: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    minHeight: isMobile ? 'auto' : '50vh',
    background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)',
  },
  heroLeft: {
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '2rem 1.5rem' : isTablet ? '2rem' : '4rem',
    paddingLeft: isMobile ? '1.5rem' : isTablet ? '4%' : '8%',
  },
  heroLeftContent: {
    maxWidth: '600px',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: 'white',
    padding: isMobile ? '0.4rem 1rem' : '0.5rem 1.25rem',
    borderRadius: '50px',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    fontWeight: 500,
    marginBottom: isMobile ? '1rem' : '2rem',
  },
  heroH1: {
    fontSize: isMobile ? '2.2rem' : isTablet ? '2.8rem' : '4rem',
    fontWeight: 800,
    color: '#333333',
    lineHeight: 1.1,
    marginBottom: isMobile ? '1rem' : '1.5rem',
  },
  textGradient: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroP: {
    fontSize: isMobile ? '1rem' : '1.2rem',
    color: '#666666',
    lineHeight: 1.7,
    marginBottom: isMobile ? '1.5rem' : '2.5rem',
  },
  heroButtons: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '1rem',
    marginBottom: isMobile ? '2rem' : '4rem',
  },
  btnHeroPrimary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: 'white',
    padding: isMobile ? '0.85rem 1.5rem' : '1rem 2rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: isMobile ? '0.95rem' : '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(196, 30, 58, 0.3)',
  },
  btnHeroSecondary: {
    background: 'transparent',
    color: '#333333',
    padding: isMobile ? '0.85rem 1.5rem' : '1rem 2rem',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: isMobile ? '0.95rem' : '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heroCounters: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '1rem' : '2.5rem',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
  },
  counterItem: {
    textAlign: 'left',
  },
  counterNumber: {
    fontSize: isMobile ? '1.8rem' : '2.5rem',
    fontWeight: 800,
    color: '#c41e3a',
    lineHeight: 1,
    marginBottom: '0.25rem',
  },
  counterLabel: {
    fontSize: isMobile ? '0.75rem' : '0.9rem',
    color: '#666666',
  },
  counterDivider: {
    width: '1px',
    height: isMobile ? '35px' : '50px',
    background: '#e0e0e0',
    display: isMobile ? 'none' : 'block',
  },
  heroRight: {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    padding: 0,
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroVisual: {
    position: 'relative',
    zIndex: 2,
  },
  heroImageCard: {
    width: isTablet ? '300px' : '380px',
    height: isTablet ? '380px' : '480px',
    background: 'white',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
  },
  floatingCard: {
    position: 'absolute',
    background: 'white',
    padding: isTablet ? '0.75rem 1rem' : '1rem 1.25rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  },
  floatingCard1: {
    top: '20%',
    left: isTablet ? '-30px' : '-60px',
  },
  floatingCard2: {
    bottom: '25%',
    right: isTablet ? '-30px' : '-60px',
  },
  floatingCardIcon: {
    fontSize: '1.5rem',
  },
  floatingCardTextStrong: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#333333',
  },
  floatingCardTextSpan: {
    fontSize: '0.75rem',
    color: '#666666',
  },
  aboutSection: {
    padding: isMobile ? '2.5rem 1.25rem' : isTablet ? '4rem 3rem' : '5rem 6rem',
    background: 'linear-gradient(135deg, #fefefe 0%, #fdf5f5 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  aboutDecorCircle1: {
    position: 'absolute',
    top: '-80px',
    right: '-80px',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(196, 30, 58, 0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  aboutDecorCircle2: {
    position: 'absolute',
    bottom: '-60px',
    left: '-60px',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(196, 30, 58, 0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  aboutDecorDots: {
    position: 'absolute',
    top: '15%',
    left: isMobile ? '5%' : '8%',
    display: isMobile ? 'none' : 'grid',
    gridTemplateColumns: 'repeat(5, 8px)',
    gap: '12px',
    opacity: 0.4,
  },
  aboutGrid: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '1.5rem' : '5rem',
    maxWidth: isMobile ? '400px' : '100%',
    margin: '0 auto',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    background: isMobile ? 'white' : 'transparent',
    borderRadius: isMobile ? '20px' : '0',
    padding: isMobile ? '1.5rem' : '0',
    boxShadow: isMobile ? '0 10px 40px rgba(0,0,0,0.06)' : 'none',
  },
  aboutImageStack: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  aboutImageWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  aboutMainImage: {
    width: isMobile ? '280px' : '420px',
    height: isMobile ? '320px' : '500px',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 80px rgba(196, 30, 58, 0.25)',
    border: 'none',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
  },
  aboutImageContainer: {
    position: 'relative',
    flexShrink: 0,
  },
  experienceCard: {
    position: 'absolute',
    bottom: isMobile ? '-10px' : '-15px',
    right: isMobile ? '10px' : '-20px',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: 'white',
    padding: isMobile ? '0.6rem 0.8rem' : '0.8rem 1rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(196, 30, 58, 0.4)',
    zIndex: 3,
    transform: 'rotate(-3deg)',
  },
  expNumber: {
    display: 'block',
    fontSize: isMobile ? '1.4rem' : '1.8rem',
    fontWeight: 800,
    lineHeight: 1,
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  expText: {
    fontSize: isMobile ? '0.6rem' : '0.7rem',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  patientsBadge: {
    position: 'absolute',
    top: isMobile ? '-10px' : '10px',
    left: isMobile ? '-5px' : '-50px',
    background: 'white',
    padding: isMobile ? '0.75rem 1rem' : '1rem 1.25rem',
    borderRadius: '15px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transform: 'rotate(3deg)',
  },
  patientsAvatars: {
    display: 'flex',
    marginRight: '-8px',
  },
  patientAvatar: {
    width: isMobile ? '28px' : '32px',
    height: isMobile ? '28px' : '32px',
    borderRadius: '50%',
    border: '2px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '0.65rem' : '0.7rem',
    fontWeight: 600,
    color: 'white',
    marginLeft: '-8px',
  },
  patientsText: {
    fontSize: isMobile ? '0.7rem' : '0.8rem',
    color: '#333',
  },
  patientsTextStrong: {
    display: 'block',
    fontWeight: 700,
    color: '#c41e3a',
    fontSize: isMobile ? '0.85rem' : '1rem',
  },
  sectionTag: {
    display: 'inline-block',
    background: 'rgba(196, 30, 58, 0.1)',
    color: '#c41e3a',
    padding: '0.4rem 1rem',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
  sectionTagLight: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
  },
  aboutRightContent: {
    flex: 1,
    textAlign: isMobile ? 'center' : 'left',
  },
  aboutRightH2: {
    fontSize: isMobile ? '1.5rem' : '3.5rem',
    color: '#333333',
    marginBottom: '0.75rem',
    fontWeight: 700,
    lineHeight: 1.15,
  },
  aboutNameHighlight: {
    background: 'linear-gradient(135deg, #c41e3a, #e85d75)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  aboutCredentials: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  credentialBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'white',
    padding: '0.4rem 0.9rem',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#333',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    border: '1px solid rgba(196, 30, 58, 0.1)',
  },
  credentialIcon: {
    fontSize: '0.9rem',
  },
  aboutDesc: {
    color: '#666',
    fontSize: isMobile ? '0.85rem' : '1.35rem',
    lineHeight: 1.6,
    marginBottom: isMobile ? '1rem' : '2rem',
    fontStyle: 'italic',
    padding: '0',
    borderLeft: 'none',
  },
  aboutStatsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? '0.5rem' : '1rem',
    marginBottom: isMobile ? '1rem' : '2rem',
    justifyContent: isMobile ? 'center' : 'flex-start',
  },
  aboutStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.35rem' : '0.6rem',
    background: 'linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%)',
    padding: isMobile ? '0.4rem 0.8rem' : '0.8rem 1.6rem',
    borderRadius: '30px',
    border: '1px solid rgba(196, 30, 58, 0.1)',
  },
  aboutStatNumber: {
    fontSize: isMobile ? '0.9rem' : '1.4rem',
    fontWeight: 700,
    color: '#c41e3a',
  },
  aboutStatLabel: {
    fontSize: isMobile ? '0.75rem' : '1.1rem',
    color: '#666',
  },
  aboutFeatures: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? '0.5rem' : '1rem',
    marginBottom: isMobile ? '1.25rem' : '2.5rem',
    justifyContent: isMobile ? 'center' : 'flex-start',
  },
  aboutFeature: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isMobile ? '0.4rem' : '0.6rem',
    padding: isMobile ? '0.45rem 0.9rem' : '0.8rem 1.5rem',
    background: 'white',
    borderRadius: '30px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
    border: '1px solid #eee',
    fontSize: isMobile ? '0.8rem' : '1.15rem',
    color: '#444',
    fontWeight: 500,
  },
  featureCheck: {
    fontSize: isMobile ? '0.9rem' : '1.3rem',
  },
  featureContent: {
    flex: 1,
  },
  aboutFeatureStrong: {
    display: 'block',
    color: '#333333',
    marginBottom: '0.1rem',
    fontSize: isMobile ? '0.8rem' : '0.85rem',
    fontWeight: 600,
  },
  aboutFeatureP: {
    color: '#666666',
    fontSize: isMobile ? '0.7rem' : '0.75rem',
    margin: 0,
    lineHeight: 1.3,
    display: isMobile ? 'block' : 'none',
  },
  aboutButtonRow: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: isMobile ? 'center' : 'flex-start',
    flexWrap: 'wrap',
  },
  btnAbout: {
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    color: 'white',
    padding: isMobile ? '0.6rem 1.25rem' : '1rem 2.5rem',
    border: 'none',
    borderRadius: '30px',
    fontSize: isMobile ? '0.85rem' : '1.15rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 6px 20px rgba(196, 30, 58, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  btnAboutSecondary: {
    background: 'transparent',
    color: '#c41e3a',
    padding: isMobile ? '0.6rem 1.25rem' : '1rem 2.5rem',
    border: '2px solid #c41e3a',
    borderRadius: '30px',
    fontSize: isMobile ? '0.85rem' : '1.15rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  whySection: {
    padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
  },
  whyHeader: {
    textAlign: 'center',
    marginBottom: isMobile ? '2rem' : '4rem',
  },
  whyHeaderH2: {
    fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
    color: 'white',
    marginBottom: '1rem',
    fontWeight: 700,
  },
  whyHeaderP: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: isMobile ? '1rem' : '1.1rem',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: isMobile ? '1rem' : '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  whyCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: isMobile ? '1.5rem' : '2.5rem 2rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    transition: 'all 0.3s',
  },
  whyIcon: {
    width: isMobile ? '50px' : '60px',
    height: isMobile ? '50px' : '60px',
    background: 'white',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: isMobile ? '0 auto 1rem' : '0 auto 1.5rem',
  },
  whyCardH3: {
    color: 'white',
    fontSize: isMobile ? '1.1rem' : '1.25rem',
    marginBottom: '0.75rem',
  },
  whyCardP: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    lineHeight: 1.6,
  },
  conditionsSection: {
    padding: isMobile ? '2rem 1.5rem' : '2rem 2rem',
    background: '#fafafa',
  },
  conditionsWrapper: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1.2fr' : '1fr 1.5fr',
    gap: isMobile ? '2rem' : isTablet ? '3rem' : '6rem',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'start',
  },
  conditionsLeftH2: {
    fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
    color: '#333333',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '1rem',
  },
  conditionsLeftP: {
    color: '#666666',
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: 1.7,
    marginBottom: isMobile ? '1.5rem' : '2rem',
  },
  btnConditions: {
    background: '#333333',
    color: 'white',
    padding: isMobile ? '0.85rem 1.5rem' : '1rem 2rem',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: isMobile ? '100%' : 'auto',
  },
  conditionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '0.75rem' : '1rem',
  },
  conditionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '1rem' : '2rem',
    padding: isMobile ? '1rem 1.25rem' : '1.5rem 2rem',
    background: 'white',
    borderRadius: '15px',
    transition: 'all 0.3s',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
  },
  conditionNum: {
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 800,
    color: '#c41e3a',
    opacity: 0.4,
    minWidth: isMobile ? '35px' : '50px',
  },
  conditionTextH4: {
    fontSize: isMobile ? '1rem' : '1.1rem',
    color: '#333333',
    marginBottom: '0.25rem',
  },
  conditionTextP: {
    color: '#666666',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    margin: 0,
  },
  testimonialsSection: {
    padding: isMobile ? '3rem 1.5rem' : isTablet ? '4rem 2rem' : '4rem 4rem',
    background: 'linear-gradient(135deg, #a01830 0%, #7a1020 100%)',
  },
  testimonialsWrapper: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1.5fr' : '1fr 1.5fr',
    gap: isMobile ? '2rem' : isTablet ? '3rem' : '6rem',
    maxWidth: '1400px',
    margin: '0 auto',
    alignItems: 'center',
  },
  testimonialsLeftH2: {
    fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
    color: 'white',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '1rem',
  },
  testimonialsLeftP: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: 1.7,
    marginBottom: isMobile ? '1rem' : '2rem',
  },
  testimonialNav: {
    display: 'flex',
    gap: '0.75rem',
  },
  navDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  navDotActive: {
    background: 'white',
    transform: 'scale(1.3)',
  },
  testimonialCardMain: {
    background: 'white',
    padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
    borderRadius: '25px',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
    height: isMobile ? '320px' : isTablet ? '350px' : '380px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  testimonialQuoteMark: {
    fontSize: isMobile ? '3rem' : '5rem',
    color: '#c41e3a',
    opacity: 0.2,
    fontFamily: 'Georgia, serif',
    lineHeight: 0.5,
    marginBottom: '1rem',
    flexShrink: 0,
  },
  testimonialMainText: {
    fontSize: isMobile ? '0.95rem' : '1.1rem',
    color: '#333333',
    lineHeight: 1.7,
    marginBottom: isMobile ? '1rem' : '1.5rem',
    flex: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 5 : 6,
    WebkitBoxOrient: 'vertical',
  },
  testimonialAuthorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  authorCircle: {
    width: isMobile ? '45px' : '55px',
    height: isMobile ? '45px' : '55px',
    background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 600,
    fontSize: isMobile ? '0.9rem' : '1rem',
  },
  testimonialAuthorStrong: {
    display: 'block',
    color: '#333333',
    fontSize: isMobile ? '1rem' : '1.1rem',
  },
  testimonialAuthorSpan: {
    color: '#666666',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
  },
  finalCta: {
    padding: isMobile ? '3rem 1.5rem' : isTablet ? '4rem 2rem' : '4rem 4rem',
    background: '#333333',
  },
  ctaWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'stretch' : 'center',
    gap: isMobile ? '1.5rem' : '2rem',
    textAlign: isMobile ? 'center' : 'left',
  },
  ctaTextH2: {
    fontSize: isMobile ? '1.75rem' : isTablet ? '2rem' : '2.5rem',
    color: 'white',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '0.5rem',
  },
  ctaTextP: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: isMobile ? '1rem' : '1.1rem',
  },
  btnCtaMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    background: 'white',
    color: '#333333',
    padding: isMobile ? '1rem 2rem' : '1.25rem 2.5rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
});

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function Home({ onBookAppointment }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const styles = getStyles(isMobile, isTablet);

  const testimonials = [
    {
      text: "I consulted Dr. Rajesh Sharma initially for irregular periods problem but he went to understand with patience actual problem for any kind of health issues...With Dr. Rajesh Sharma I healed by acknowledging other emotional issues which were affecting my sleep pattern and triggering anger. He has given lot of patience for listening and with his deep knowledge I have been able to heal from childhood trauma which were affecting my mental and emotional health. Can't thank you enough for being a part of healing. Thank you so much. Stay Blessed.",
      name: "CHANDRIKA PATHAI",
      location: "Mumbai",
      condition: "mental health",
      initials: "CP"
    },
    {
      text: "With immense gratitude want to take this opportunity to thank Dr Pandey for her exceptional care and treatment she has been providing since the last 20 years to each one of us in our family.Our acquaintance dates back to the year 2004 when my wife was detected with fibroadenomas in the chest, we had contacted her and got the treatment done under her expertise, soon my wife got completely cured and since then we have chosen her as our family physician and she is treating every ailment small or big with utmost care. Now though we have moved out of Navi Mumbai but still continue to consult her through Video Call and are taking her expert advice. Recently she treated my wife for Thyroid problem and allergic Bronchitis. It’s such a relief and we are so happy to stay connected in this way 🙏",
      name: "Vegesna Raju",
      location: "Mumbai",
      condition: "Parent",
      initials: "VR"
    },
    {
      text: "Dr. Rajesh Sharma is our family doctor for 20 years and he gives time to each patient and is very understanding and dedicated. I can trust him every time, whether it be my kids, parents, friends, etc. He is very polite and humble and has treated several concerns ranging from skin diseases, bronchitis, fear of exams, eczema, irregular periods, fever, cold cough, and vomiting. He's a very trustworthy go-to doctor! We have got quick results and faster healing. A very sincere and devoted homeopath indeed!",
      name: "Shilpa Mehta",
      location: "Delhi",
      condition: "Regular Client",
      initials: "SM"
    },
    {
      text: "Heartfelt gratitude to Dr. Rajesh Sharma 🙏 My son had multiple health issues like Sinusitis, severe headache, warts on the face, legs, palms etc. few were even painful and he suffered for 3 years though we consulted other homeopathic physicians but there was absolutely no improvement until we did an online video consultation with Dr. Rajesh Sharma. He with his expertise treated my son and there was quick and miraculous recovery. The treatment not only cured the above ailments but also developed my child in terms of behavior, like he became more confident and expressive which was also a major relief for me as a parent. I feel blessed to have been able to get in touch with him for my family!! Thank you Dr. Rajesh Sharma for your dedication, help and support 🙏.",
      name: "archana vegesna",
      location: "Delhi",
      condition: "Parent",
      initials: "AV"
    },
    {
      text: "My association with Dr. Rajesh Sharma is more than a decade. He consistently updates his knowledge by conducting and attending workshops with other doctors on advanced topics of homeopathy. He hears patiently and understands your problems. I have consulted him for Fibromyalgia(body pain) and also have got relief from disturbing dreams. He knows his subject well and guides patients properly.",
      name: "Padmaja Iyer",
      location: "Delhi",
      condition: "Patient",
      initials: "PI"
    },
    {
      text: "Since last one decade, we know Dr. Rajesh Sharma. He is a very good homeopathic doctor. I have a problem of Pharyngitis which got cured by his medicine. He is very dedicated, humble and gives right medication for all the health issues. Very much recommended to everyone.",
      name: "SUNKARA SUDHAKAR",
      location: "Mumbai",
      condition: "Pharyngitis Patient",
      initials: "SS"  
    },
    {
      text: "Dr. Rajesh Sharma has been our family's trusted homeopathic doctor for years. His approach to understanding the root cause of health issues rather than just treating symptoms is what sets him apart. My mother's chronic arthritis improved significantly under his care. Highly recommended!",
      name: "Rajesh Kumar",
      location: "Navi Mumbai",
      condition: "Arthritis",
      initials: "RK"
    },
    {
      text: "I was suffering from severe migraines for over 5 years. After trying various treatments with no success, I consulted Dr. Rajesh Sharma. His personalized treatment plan worked wonders. Within 3 months, my migraine frequency reduced drastically. Forever grateful!",
      name: "Priya Sharma",
      location: "Delhi",
      condition: "Migraine",
      initials: "PS"
    },
    {
      text: "Dr. Rajesh Sharma's treatment for my child's recurrent respiratory infections has been exceptional. Unlike conventional medicine that only provided temporary relief, his homeopathic approach has strengthened my child's immunity. We rarely visit him for illness now - only for routine check-ups!",
      name: "Meena Desai",
      location: "Delhi",
      condition: "Child Care",
      initials: "MD"
    },
    {
      text: "I had given up hope on treating my skin condition until I found Dr. Rajesh Sharma. His patience in understanding my case history and his expertise in homeopathy helped clear my chronic eczema that I had for 10 years. Thank you for giving me my confidence back!",
      name: "Amit Patel",
      location: "Delhi",
      condition: "Skin Disease",
      initials: "AP"
    },

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div style={styles.homePage}>
      {/* Hero Section - Full Width Split Layout */}
      <section style={styles.heroSplit}>
        <div style={styles.heroLeft}>
          <div style={styles.heroLeftContent}>
            <span style={styles.heroBadge}>✦ Trusted Homeopathic Care</span>
            <h1 style={styles.heroH1}>
              Heal Naturally.<br />
              <span style={styles.textGradient}>Live Fully.</span>
            </h1>
            <p style={styles.heroP}>
              Experience personalized homeopathic treatment that addresses the root cause 
              of your health concerns, not just the symptoms.
            </p>
            <div style={styles.heroButtons}>
              <button style={styles.btnHeroPrimary} onClick={onBookAppointment}>
                Book Consultation
                <span>→</span>
              </button>
              <button style={styles.btnHeroSecondary} onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </button>
            </div>
            
            {/* Stats with Animated Counters */}
            <div style={styles.heroCounters}>
              <div style={styles.counterItem}>
                <div style={styles.counterNumber}>
                  <AnimatedCounter end={10} suffix="+" />
                </div>
                <div style={styles.counterLabel}>Years of Excellence</div>
              </div>
              <div style={styles.counterDivider}></div>
              <div style={styles.counterItem}>
                <div style={styles.counterNumber}>
                  <AnimatedCounter end={1000} suffix="+" />
                </div>
                <div style={styles.counterLabel}>Happy Patients</div>
              </div>
              <div style={styles.counterDivider}></div>
              <div style={styles.counterItem}>
                <div style={styles.counterNumber}>
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div style={styles.counterLabel}>Conditions Treated</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.heroRight}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '100%',
          }}>
            <img 
              src="/head.png" 
              alt="Doctor" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(196, 30, 58, 0.3)',
              pointerEvents: 'none',
            }}></div>
          </div>
        </div>
      </section>

      {/* About Doctor - Creative Premium Layout */}
      <section style={styles.aboutSection} id="about">
        {/* Decorative Background Elements */}
        <div style={styles.aboutDecorCircle1}></div>
        <div style={styles.aboutDecorCircle2}></div>
        <div style={styles.aboutDecorDots}>
          {[...Array(25)].map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#c41e3a',
            }}></div>
          ))}
        </div>

        <div style={styles.aboutGrid}>
          {/* Left - Doctor Image */}
          <div style={styles.aboutImageContainer}>
            <div style={styles.aboutMainImage}>
              <img 
                src="/heroimg.png" 
                alt="Dr. Rajesh Sharma" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            </div>
            {/* Experience Badge */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '10px' : '30px',
              right: isMobile ? '-10px' : '-30px',
              background: 'linear-gradient(135deg, #c41e3a 0%, #a01830 100%)',
              color: 'white',
              padding: isMobile ? '1rem' : '1.5rem',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(196, 30, 58, 0.4)',
              zIndex: 3,
            }}>
              <span style={{ display: 'block', fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 800, lineHeight: 1 }}>10+</span>
              <span style={{ fontSize: isMobile ? '0.65rem' : '0.8rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>Years Exp.</span>
            </div>
            {/* Happy Patients Badge */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '10px' : '40px',
              left: isMobile ? '-10px' : '-40px',
              background: 'white',
              padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{
                width: isMobile ? '36px' : '45px',
                height: isMobile ? '36px' : '45px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '1.2rem' : '1.5rem',
              }}>💚</div>
              <div>
                <span style={{ display: 'block', fontWeight: 700, color: '#c41e3a', fontSize: isMobile ? '1rem' : '1.2rem' }}>1000+</span>
                <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#666' }}>Happy Patients</span>
              </div>
            </div>
          </div>
          
          {/* Right - Content */}
          <div style={styles.aboutRightContent}>
            <h2 style={styles.aboutRightH2}>
              Dr. <span style={styles.aboutNameHighlight}>Sharma</span>
              <span style={{ fontSize: isMobile ? '0.6rem' : '1.2rem', fontWeight: 500, color: '#888', marginLeft: '1rem' }}>B.H.M.S</span>
            </h2>

            <p style={styles.aboutDesc}>
              "Healing naturallyaddressing root causes, not just symptoms."
            </p>

            {/* Stats as inline badges */}
            <div style={styles.aboutStatsRow}>
              <div style={styles.aboutStatItem}>
                <span style={styles.aboutStatNumber}>10+</span>
                <span style={styles.aboutStatLabel}>Years</span>
              </div>
              <div style={styles.aboutStatItem}>
                <span style={styles.aboutStatNumber}>50+</span>
                <span style={styles.aboutStatLabel}>Conditions</span>
              </div>
              <div style={styles.aboutStatItem}>
                <span style={styles.aboutStatNumber}>98%</span>
                <span style={styles.aboutStatLabel}>Success</span>
              </div>
            </div>

            {/* Features as simple chips */}
            <div style={styles.aboutFeatures}>
              <div style={styles.aboutFeature}>
                <span style={styles.featureCheck}>🌿</span>
                <span>Classical Homeopathy</span>
              </div>
              <div style={styles.aboutFeature}>
                <span style={styles.featureCheck}>💊</span>
                <span>Personalized Care</span>
              </div>
              <div style={styles.aboutFeature}>
                <span style={styles.featureCheck}>🧠</span>
                <span>Holistic Healing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.aboutButtonRow}>
              <button style={styles.btnAbout} onClick={onBookAppointment}>
                Book Consultation <span>→</span>
              </button>
              <button style={styles.btnAboutSecondary} onClick={() => document.getElementById('conditions').scrollIntoView({ behavior: 'smooth' })}>
                View Expertise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Homeopathy - Full Width Cards */}
      <section style={styles.whySection}>
        <div style={styles.whyHeader}>
          <span style={{ ...styles.sectionTag, ...styles.sectionTagLight }}>Why Homeopathy</span>
          <h2 style={styles.whyHeaderH2}>The Natural Path to Wellness</h2>
          <p style={styles.whyHeaderP}>Discover why millions choose homeopathy for lasting health</p>
        </div>
        <div style={styles.whyGrid}>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 style={styles.whyCardH3}>100% Natural</h3>
            <p style={styles.whyCardP}>Pure remedies from natural sources that work in harmony with your body</p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 style={styles.whyCardH3}>No Side Effects</h3>
            <p style={styles.whyCardP}>Safe for all ages — infants, elderly, and expectant mothers</p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <h3 style={styles.whyCardH3}>Lasting Results</h3>
            <p style={styles.whyCardP}>Treats root causes for permanent healing, not temporary relief</p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 style={styles.whyCardH3}>Boosts Immunity</h3>
            <p style={styles.whyCardP}>Strengthens your natural defense system from within</p>
          </div>
        </div>
      </section>

      {/* Conditions - Modern List */}
      <section style={styles.conditionsSection} id="conditions">
        <div style={styles.conditionsWrapper}>
          <div>
            <span style={styles.sectionTag}>Expertise</span>
            <h2 style={styles.conditionsLeftH2}>Conditions<br />We Treat</h2>
            <p style={styles.conditionsLeftP}>Comprehensive care for chronic and acute health conditions with proven results.</p>
            <button style={styles.btnConditions} onClick={onBookAppointment}>
              Get Treatment →
            </button>
          </div>
          <div>
            <div style={styles.conditionsList}>
              <div style={styles.conditionRow}>
                <span style={styles.conditionNum}>01</span>
                <div>
                  <h4 style={styles.conditionTextH4}>Allergies & Respiratory</h4>
                  <p style={styles.conditionTextP}>Asthma, sinusitis, hay fever, chronic cough</p>
                </div>
              </div>
              <div style={styles.conditionRow}>
                <span style={styles.conditionNum}>02</span>
                <div>
                  <h4 style={styles.conditionTextH4}>Skin Disorders</h4>
                  <p style={styles.conditionTextP}>Eczema, psoriasis, acne, vitiligo, hair loss</p>
                </div>
              </div>
              <div style={styles.conditionRow}>
                <span style={styles.conditionNum}>03</span>
                <div>
                  <h4 style={styles.conditionTextH4}>Digestive Issues</h4>
                  <p style={styles.conditionTextP}>IBS, acidity, GERD, constipation, liver problems</p>
                </div>
              </div>
              <div style={styles.conditionRow}>
                <span style={styles.conditionNum}>04</span>
                <div>
                  <h4 style={styles.conditionTextH4}>Joint & Muscle Pain</h4>
                  <p style={styles.conditionTextP}>Arthritis, back pain, sciatica, sports injuries</p>
                </div>
              </div>
              <div style={styles.conditionRow}>
                <span style={styles.conditionNum}>05</span>
                <div>
                  <h4 style={styles.conditionTextH4}>Mental Wellness</h4>
                  <p style={styles.conditionTextP}>Anxiety, depression, insomnia, stress, migraine</p>
                </div>
              </div>
              <div style={styles.conditionRow}>
                <span style={styles.conditionNum}>06</span>
                <div>
                  <h4 style={styles.conditionTextH4}>Pediatric Care</h4>
                  <p style={styles.conditionTextP}>Growth issues, ADHD, infections, behavioral problems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slideshow */}
      <section style={styles.testimonialsSection}>
        <div style={styles.testimonialsWrapper}>
          <div>
            <span style={{ ...styles.sectionTag, ...styles.sectionTagLight }}>Testimonials</span>
            <h2 style={styles.testimonialsLeftH2}>Stories of<br />Healing</h2>
            <p style={styles.testimonialsLeftP}>Real experiences from patients whose lives we've touched</p>
            <div style={styles.testimonialNav}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  style={index === currentTestimonial ? { ...styles.navDot, ...styles.navDotActive } : styles.navDot}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
          <div>
            <div style={styles.testimonialCardMain} key={currentTestimonial}>
              <div style={styles.testimonialQuoteMark}>"</div>
              <p style={styles.testimonialMainText}>{testimonials[currentTestimonial].text}</p>
              <div style={styles.testimonialAuthorInfo}>
                <div style={styles.authorCircle}>{testimonials[currentTestimonial].initials}</div>
                <div>
                  <strong style={styles.testimonialAuthorStrong}>{testimonials[currentTestimonial].name}</strong>
                  <span style={styles.testimonialAuthorSpan}>{testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].condition}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.finalCta}>
        <div style={styles.ctaWrapper}>
          <div>
            <h2 style={styles.ctaTextH2}>Ready to Start Your<br />Healing Journey?</h2>
            <p style={styles.ctaTextP}>Book your consultation today and take the first step towards natural wellness.</p>
          </div>
          <button style={styles.btnCtaMain} onClick={onBookAppointment}>
            Book Appointment Now
            <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
