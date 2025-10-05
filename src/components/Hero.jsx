import React, { useState, useRef, useEffect } from 'react';
import './Hero.css';

function AnimatedPortrait({ currentImage, onPortraitHover, isPortraitHovered }) {
    const [animationImage, setAnimationImage] = useState(0);
    const intervalRef = useRef(null);
    
    const animationImages = [
        '/portrait/me1.png',
        '/portrait/me2.png',
        '/portrait/me3.png'
    ];
    
    useEffect(() => {
        if (isPortraitHovered) {
            // Start animation cycle when hovering over portrait
            intervalRef.current = setInterval(() => {
                setAnimationImage(prev => (prev + 1) % animationImages.length);
            }, 500); // Change image every 500ms
        } else {
            // Stop animation and reset to first image when not hovering portrait
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setAnimationImage(0);
        }
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPortraitHovered, animationImages.length]);
    
    // Use animation image when hovering portrait, otherwise use button-controlled image
    const displayImage = isPortraitHovered ? animationImages[animationImage] : currentImage;
    
    return (
        <div 
            className="animated-portrait"
            onMouseEnter={() => onPortraitHover(true)}
            onMouseLeave={() => onPortraitHover(false)}
        >
            <img 
                src={displayImage} 
                alt="Siddharth - Full Stack Developer" 
            />
        </div>
    );
}


function Slime({ position }) {
    // Add a jumping class when position changes
    const [isJumping, setIsJumping] = React.useState(false);
    
    React.useEffect(() => {
        // Trigger jump animation when position changes
        setIsJumping(true);
        const timer = setTimeout(() => setIsJumping(false), 500);
        return () => clearTimeout(timer);
    }, [position.x]);

    return (
        <div 
            className={`slime-container ${isJumping ? 'jumping' : ''}`}
            style={{
                left: position.x,
                bottom: position.y,
                '--jump-distance': position.y === '30%' ? '40px' : '0px',
                transition: 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
        >
            <div className="slime"></div>
        </div>
    );
}

export default function Hero() {
    const [slimePosition, setSlimePosition] = useState({ x: '30%', y: '32%' });
    const [portraitImage, setPortraitImage] = useState('/portrait/me1.png');
    const [isPortraitHovered, setIsPortraitHovered] = useState(false);
    const buttonsRef = useRef([]);

    

    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <h1>I'M SIDDHARTH</h1>
                <p>
                    Frontend Developer | Backend Developer |
                    <span className="highlight"> Turning Ideas into Digital Reality</span>
                </p>
                
                <Slime position={slimePosition} />
                
                <div className="hero-buttons">
                    <a 
                        ref={el => buttonsRef.current[0] = el}
                        href="#contact" 
                        className="hero-btn"
                        
                        onMouseEnter={() => {
                            setSlimePosition({ x: '25%', y: '0%' });
                            
                        }}
                        onMouseLeave={() => setPortraitImage('/portrait/me1.png')}
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('contact');
                            if (element) {
                                const offsetTop = element.offsetTop - 100;
                                window.scrollTo({
                                    top: offsetTop,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                    >
                        HIRE ME
                    </a>
                    <a 
                        ref={el => buttonsRef.current[1] = el}
                        href="/resume.pdf" 
                        className="hero-btn secondary"
                        
                        onMouseEnter={() => {
                            setSlimePosition({ x: '75%', y: '0%' });
                            
                        }}
                        onMouseLeave={() => setPortraitImage('/portrait/me1.png')}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        VIEW RESUME
                    </a>
                </div>
            </div>
            
            <AnimatedPortrait 
                currentImage={portraitImage} 
                onPortraitHover={setIsPortraitHovered}
                isPortraitHovered={isPortraitHovered}
            />
        </section>
    );
}
