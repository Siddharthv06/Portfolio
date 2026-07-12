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
            intervalRef.current = setInterval(() => {
                setAnimationImage(prev => (prev + 1) % animationImages.length);
            }, 500);
        } else {
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
    const [isJumping, setIsJumping] = React.useState(false);

    React.useEffect(() => {
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

// Typewriter effect for role text
function TypewriterText() {
    const roles = [
        'Software Developer',
        'AI Engineer',
        'Backend Developer',
        'Full Stack Developer'
    ];
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && text === currentRole) {
            // Pause at full text
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            // Move to next role
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            const speed = isDeleting ? 40 : 80;
            timeout = setTimeout(() => {
                setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
            }, speed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    return (
        <span className="typewriter-text">
            {text}<span className="typewriter-cursor">_</span>
        </span>
    );
}

export default function Hero() {
    const [slimePos, setSlimePos] = useState({ x: 0, y: 0 });
    const [portraitImage, setPortraitImage] = useState('/portrait/me1.png');
    const [isPortraitHovered, setIsPortraitHovered] = useState(false);
    const [showHireModal, setShowHireModal] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const buttonsRef = useRef([]);
    const heroRef = useRef(null);

    // Position slime centered on top of a button
    const moveSlimeToButton = (index) => {
        const btn = buttonsRef.current[index];
        if (!btn) return;

        const container = btn.parentElement;
        if (!container) return;

        // Position relative to hero-buttons container
        const x = btn.offsetLeft + (btn.offsetWidth / 2);
        const y = container.offsetHeight - btn.offsetTop + 10; // 10px gap above button

        setSlimePos({ x, y });
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);
    };

    // Default: sit on first button after mount
    useEffect(() => {
        const timer = setTimeout(() => moveSlimeToButton(0), 300);
        return () => clearTimeout(timer);
    }, []);

    // Recalculate on window resize to ensure slime stays on target
    useEffect(() => {
        const handleResize = () => {
            // Find which button the slime is currently closer to
            if (slimePos.x > 0) {
                const btn1 = buttonsRef.current[0];
                const btn2 = buttonsRef.current[1];
                if (btn1 && btn2) {
                    const dist1 = Math.abs(slimePos.x - (btn1.offsetLeft + btn1.offsetWidth / 2));
                    const dist2 = Math.abs(slimePos.x - (btn2.offsetLeft + btn2.offsetWidth / 2));
                    moveSlimeToButton(dist1 < dist2 ? 0 : 1);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [slimePos]);

    return (
        <section id="hero" className="hero" ref={heroRef}>
            <div className="hero-content">
                <span className="hero-greeting">HELLO WORLD, I'M</span>
                <h1>SIDDHARTH<span className="hero-dot">.</span></h1>
                <div className="hero-role">
                    <TypewriterText />
                </div>
                <p className="hero-tagline">
                    Turning Ideas into Digital Reality
                </p>

                <div className="hero-buttons">
                    {/* Slime sits on top of buttons */}
                    <div
                        className={`slime-container ${isJumping ? 'jumping' : ''}`}
                        style={{
                            left: `${slimePos.x}px`,
                            bottom: `${slimePos.y}px`,
                            transition: 'left 0.6s cubic-bezier(0.25, 1, 0.5, 1), bottom 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                    >
                        <div className="slime"></div>
                    </div>
                    <a
                        ref={el => buttonsRef.current[0] = el}
                        href="#"
                        className="hero-btn"
                        onMouseEnter={() => moveSlimeToButton(0)}
                        onMouseLeave={() => setPortraitImage('/portrait/me1.png')}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowHireModal(true);
                        }}
                    >
                        HIRE ME
                    </a>
                    <a
                        ref={el => buttonsRef.current[1] = el}
                        href="/Resume.pdf"
                        className="hero-btn secondary"
                        onMouseEnter={() => moveSlimeToButton(1)}
                        onMouseLeave={() => setPortraitImage('/portrait/me1.png')}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        VIEW RESUME
                    </a>
                </div>

                <div className="hero-scroll-hint">
                    <span className="scroll-arrow">▼</span>
                    <span className="scroll-text">SCROLL DOWN</span>
                </div>
            </div>

            <AnimatedPortrait
                currentImage={portraitImage}
                onPortraitHover={setIsPortraitHovered}
                isPortraitHovered={isPortraitHovered}
            />

            {showHireModal && (
                <div className="hire-modal-overlay" onClick={() => setShowHireModal(false)}>
                    <div className="hire-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="hire-modal-close" onClick={() => setShowHireModal(false)}>✕</button>
                        <h3 className="hire-modal-title">LET'S WORK TOGETHER</h3>
                        <div className="hire-modal-contact">
                            <a href="tel:+919422551667" className="hire-modal-phone">
                                <i className="fas fa-phone"></i>
                                +91 9422551667
                            </a>
                            <a href="mailto:siddharthv210106@gmail.com" className="hire-modal-email">
                                <i className="fas fa-envelope"></i>
                                siddharthv210106@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
