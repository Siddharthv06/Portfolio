import React, { useState, useRef, useEffect } from "react";
import "./skill.css";
import useScrollReveal from '../hooks/useScrollReveal';

// Using placeholder pixel art style images from external sources
// These are temporary - replace with your actual pixel art avatars
const skills = [
  { 
    name: "REACT", 
    type: "J", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
    suit: "♦" 
  },
  { 
    name: "CSS", 
    type: "A", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
    suit: "♦" 
  },
  { 
    name: "PYTHON", 
    type: "K", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
    suit: "♠" 
  },
  { 
    name: "FASTAPI", 
    type: "K", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", 
    suit: "♠" 
  },
  { 
    name: "HTML", 
    type: "Q", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg", 
    suit: "♥" 
  },
  { 

    name: "JS", 
    type: "J", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    suit: "♣" 
  },
  { 
    name: "GIT", 
    type: "Q", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
    suit: "♥" 
  },

  { 
    name: "AWS", 
    type: "A", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", 
    suit: "♦" 
  },
  { 
    name: "C++", 
    type: "J", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", 
    suit: "♣" 
  },
  { 
    name: "AI/ML", 
    type: "A", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", 
    suit: "♦" 
  },
  { 
    name: "FLUTTER", 
    type: "K", 
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", 
    suit: "♠" 
  },
];

function Jump({ position, direction }) {
    // Add a jumping class when position changes
    const [isJumping, setIsJumping] = React.useState(false);
    const [isMoving, setIsMoving] = React.useState(false);
    
    React.useEffect(() => {
        // Trigger movement and jump animation when position changes
        setIsMoving(true);
        setIsJumping(true);
        
        // Natural jump duration - matches the bounce physics
        const jumpTimer = setTimeout(() => setIsJumping(false), 800);
        const moveTimer = setTimeout(() => setIsMoving(false), 1200);
        
        return () => {
            clearTimeout(jumpTimer);
            clearTimeout(moveTimer);
        };
    }, [position.x, position.y]);

    return (
        <div 
            className={`jump-container ${isJumping ? 'jumping' : ''} ${isMoving ? 'moving' : ''} ${direction === 'left' ? 'flipped' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: 'left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
        >
            <div className="jump"></div>
        </div>
    );
}


export default function Skill() {
  const [shuffled, setShuffled] = useState(skills);
  const [jumpPosition, setJumpPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('right'); // Track movement direction
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const revealRef = useScrollReveal();

  // Combine refs
  const combinedRef = (el) => {
    containerRef.current = el;
    revealRef.current = el;
  };

  // Calculate initial position after component mounts
  useEffect(() => {
    updateJumpPosition(0); // Start on first card
  }, []);

  const updateJumpPosition = (cardIndex) => {
    if (cardRefs.current[cardIndex] && containerRef.current) {
      const card = cardRefs.current[cardIndex];
      const container = containerRef.current; 
      
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate position relative to container, centered horizontally, positioned on top of card
      const x = (cardRect.left - containerRect.left) + (cardRect.width /2);
      const y = (cardRect.top - containerRect.top) - 150; // Full sprite height above card (128px)
      
      // Detect direction based on previous position
      if (x < prevPosition.x) {
        setDirection('left'); // Moving left - should flip sprite
      } else if (x > prevPosition.x) {
        setDirection('right'); // Moving right - normal sprite
      }
      
      setPrevPosition({ x, y });
      setJumpPosition({ x, y });
    }
  };

  const shuffleDeck = () => {
    const newDeck = [...shuffled].sort(() => Math.random() - 0.5);
    setShuffled(newDeck);
    // Recalculate position after shuffle
    setTimeout(() => updateJumpPosition(0), 100);
  };

  const handleCardHover = (index) => {
    updateJumpPosition(index);
  };

  return (
    <section id="skills" className="skills-container scroll-reveal" ref={combinedRef}>
      <Jump position={jumpPosition} direction={direction} />
      <h2 className="skills-title">SKILL DECK</h2>
      <div className="skills-grid">
        {shuffled.map((skill, index) => (
          <div 
            key={index} 
            ref={el => cardRefs.current[index] = el}
            className={`card ${skill.type.toLowerCase()}`}
            onMouseEnter={() => handleCardHover(index)}
          >
            <div className="card-corner top-left">
              <div className="card-rank">{skill.type}</div>
              <div className="card-suit">{skill.suit}</div>
            </div>
            
            <img src={skill.img} alt={skill.name} className="card-img" />
            <div className="card-content">{skill.name}</div>
            
            <div className="card-corner bottom-right">
              <div className="card-suit inverted">{skill.suit}</div>
              <div className="card-rank inverted">{skill.type}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={shuffleDeck} className="shuffle-btn"
      >
        🎲 SHUFFLE DECK
      </button>
      <p className="legend">
        ACE = Top Tier Expert &nbsp;|&nbsp; KING = Consider It Done<br />
        QUEEN = I Can Do &nbsp;|&nbsp; JACK = Confident
      </p>
    </section>
  );
}
