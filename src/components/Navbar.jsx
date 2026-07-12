import "./Navbar.css";
import { useState, useEffect, useRef } from 'react';
import { Walk, Run, Attack } from './Sprite';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpKey, setJumpKey] = useState(0);

  const navItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
  ];
  
  // Navigation handler with smooth scrolling
  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
    const element = document.getElementById(itemId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 150; // Offset for navbar
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPos >= section.offsetTop) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);
  const speechMessages = [
    "I am sid",
    "CODE IS LIFE!", 
    "WANNA HIRE ME?",
    "LET'S BUILD SOMETHING AWESOME!"
  ];
  
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  
  // Message cycling effect
  useEffect(() => {
    const cycleMessages = () => {
      setMessageIndex(prevIndex => {
        const nextIndex = prevIndex >= speechMessages.length - 1 ? 0 : prevIndex + 1;
        console.log('Cycling to message index:', nextIndex, 'Message:', speechMessages[nextIndex]);
        return nextIndex;
      });
    };
    
    // Start cycling after initial load
    const intervalId = setInterval(cycleMessages, 5000); // 5 seconds
    return () => clearInterval(intervalId);
  }, []);
  
  // Text typing animation effect (for message changes)
  useEffect(() => {
    const targetMessage = speechMessages[messageIndex];
    if (!targetMessage) return;
    
    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    setCurrentText('');
    setIsAnimating(true);
    
    let charIndex = 0;
    
    const typeCharacter = () => {
      if (charIndex < targetMessage.length) {
        setCurrentText(targetMessage.substring(0, charIndex + 1));
        charIndex++;
        animationRef.current = setTimeout(typeCharacter, 60);
      } else {
        setIsAnimating(false);
      }
    };
    
    // Start typing after a brief delay
    const delay = messageIndex === 0 ? 500 : 200; // Longer delay for first message
    animationRef.current = setTimeout(typeCharacter, delay);
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [messageIndex]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest('.sprite-container')) return;
      
      setJumpKey(prev => prev + 1);
      setIsJumping(true);
      
      const jumpTimer = setTimeout(() => {
        setIsJumping(false);
      }, 1000);
      
      return () => clearTimeout(jumpTimer);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <nav 
      className="navbar"
      style={{ '--dot-animation-speed': isHovered ? '0.3s' : '0.8s' }}
    >
      <div className="nav-container">
        <div className="nav-dots">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-dot ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-label={item.label}
            >
              <span className="dot"></span>
              <span className="label">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div 
          className="avatar-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            key={`sprite-${jumpKey}`}
            className="sprite-container" 
            style={{
             
            }}
            onAnimationEnd={() => setIsJumping(false)}
          >
            {isJumping ? <Attack /> : (isHovered ? <Run /> : <Walk />)}
          </div>
          <div className="speech-bubble">
            <span className="bubble-text">
              {currentText || 'I am sid'}
            </span>
            {isAnimating && <span className="cursor">|</span>}
          </div>
        </div>
      </div>
    </nav>
  );
}