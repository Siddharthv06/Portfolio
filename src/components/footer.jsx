import React from 'react';
import './footer.css';

export default function Footer() {
  const socialLinks = [
    { 
      name: 'GITHUB', 
      url: 'https://github.com/Siddharthv06', 
      icon: 'fab fa-github',
      color: '#333'
    },
    { 
      name: 'LINKEDIN', 
      url: 'https://www.linkedin.com/in/siddharth-vishwakarma-54971823b/', 
      icon: 'fab fa-linkedin',
      color: '#0077B5'
    },
    { 
      name: 'GMAIL', 
      url: 'mailto:siddharthv210106@gmail.com', 
      icon: 'fas fa-envelope',
      color: '#EA4335'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>SIDDHARTH</h3>
            <p>Full Stack Developer & Pixel Art Enthusiast</p>
            <p className="footer-tagline">Turning Ideas into Digital Reality</p>
          </div>
          
          <div className="footer-links">
            <h4>CONNECT WITH ME</h4>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  style={{'--link-color': link.color}}
                >
                  <i className={link.icon}></i>
                  <span className="link-label">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p>&copy; {new Date().getFullYear()} Siddharth. Built with passion and pixels. All rights reserved.</p>
          <p className="footer-tech">Made with React & Vite </p>
        </div>
      </div>
    </footer>
  );
}