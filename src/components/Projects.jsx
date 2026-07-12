import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  {
    id: 1,
    title: "Brain Tumor Detector",
    description: "AI based brain tumor predictor trained from scratch. The predictor accuracy is 98.0% ",
    technologies: ["Python", "TensorFlow", "Keras", "Machine Learning"],
    githubUrl: "https://github.com/Siddharthv06/Brain-Tumor-Detector",
    liveUrl: "https://github.com/Siddharthv06/Brain-Tumor-Detector",
    image: "braintumor.png"
  },

  {
    id: 2,
    title: "PaperWave",
    description: "PaperWave is a music app with unique inifinite song scroll feature based on our mood and unique UI",
    technologies: ["Dart", "Flutter", "Material UI", "Itune", "jamendo"],
    githubUrl: "https://github.com/Siddharthv06/PaperWave",
    liveUrl: "https://github.com/Siddharthv06/PaperWave",
    image: "paperwave.png"

  },
  {
    id: 3,
    title: "PROFESSIONAL PHOTOGRAPHY",
    description: "Professional photography website with portfolio display and contact form",
    technologies: ["JavaScript", "API", "CSS3", "HTML5"],
    githubUrl: "https://github.com/Siddharthv06/Professional-photography-website",
    liveUrl: "https://ravi-photos.onrender.com/",
    image: "photo.png"
  },
  {
    id: 4,
    title: "WHATSAPP AUTOMATION",
    description: "Server based whatApp automation using FastAPI and SQLlite",
    technologies: ["Python", "FastAPI", "SQLlite", "HTML5", "CSS3", "LocalStorage"],
    githubUrl: "https://github.com/Siddharthv06/WhatsApp-Automation",
    liveUrl: "https://github.com/Siddharthv06/WhatsApp-Automation",
    image: ""
  },
  {
    id: 5,
    title: "CROWD PANIC DETECTOR",
    description: "AI that acceses the camera and detects crowd panic and alerts the user.",
    technologies: ["Python", "OpenCV", "Machine Learning"],
    githubUrl: "https://github.com/Siddharthv06/Crowd-Disaster-managment",
    liveUrl: "https://github.com/Siddharthv06/Crowd-Disaster-managment",
    image: ""
  },
  {
    id: 6,
    title: "PORTFOLIO",
    description: "Personal portfolio website with pixel art design and interactive elements",
    technologies: ["React", "CSS3", "JavaScript", "Vite"],
    githubUrl: "https://github.com/Siddharthv06/Portfolio",
    liveUrl: "https://portfolio-yx5q.onrender.com/",
    image: "pixel.png"
  },

];

export default function Projects() {
  const [isJumping, setIsJumping] = useState(false);
  const [isSitting, setIsSitting] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const characterRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    console.log('Projects component mounted, starting position detection');

    // Wait for DOM to be fully rendered
    const timeout = setTimeout(() => {
      const checkPosition = () => {
        if (!characterRef.current || cardsRef.current.length === 0) {
          console.log('Waiting for character or cards to load...');
          return;
        }

        const characterRect = characterRef.current.getBoundingClientRect();
        const characterCenter = characterRect.left + characterRect.width / 2;

        // Check if character is over any project card
        let overCard = false;
        cardsRef.current.forEach((card, index) => {
          if (card) {
            const cardRect = card.getBoundingClientRect();
            if (characterCenter >= cardRect.left && characterCenter <= cardRect.right) {
              overCard = true;
              console.log(`Character is over card ${index + 1}`);
            }
          }
        });

        // Only handle jumping logic when not sitting
        if (!isSitting) {
          // Jump when between cards (not over any card)
          const shouldJump = !overCard;
          if (shouldJump !== isJumping) {
            console.log('Character animation changing:', shouldJump ? 'JUMPING (between cards)' : 'WALKING (on card)');
            setIsJumping(shouldJump);
          }
        }
      };

      // Check position every 200ms for better performance
      const interval = setInterval(checkPosition, 200);

      return () => clearInterval(interval);
    }, 1000); // Wait 1 second for DOM to load

    return () => clearTimeout(timeout);
  }, [isJumping, isSitting, hoveredCardIndex]);

  // Handle card hover events - trigger sitting immediately
  const handleCardHover = (index) => {
    console.log(`Hovering on card ${index + 1} - triggering sitting animation immediately`);
    setHoveredCardIndex(index);
    setIsSitting(true);
    setIsJumping(false);
  };

  const handleCardLeave = () => {
    console.log('Stopped hovering on cards - character resumes movement');
    setHoveredCardIndex(null);
    setIsSitting(false); // Stop sitting immediately when mouse leaves
  };

  // Add debugging for state changes
  useEffect(() => {
    console.log('Animation state - isJumping:', isJumping, 'isSitting:', isSitting);
  }, [isJumping, isSitting]);

  const sectionRef = useScrollReveal();

  return (
    <section id="projects" className="projects scroll-reveal" ref={sectionRef}>
      <div className="projects-container">
        {/* Character that moves across screen and switches animation */}
        <div className="walking-character" ref={characterRef}>
          {isSitting ? (
            <div className="character-sitting-sprite"></div>
          ) : isJumping ? (
            <div className="character-jump-sprite"></div>
          ) : (
            <div className="character-sprite"></div>
          )}
        </div>
        {/* Debug indicator */}


        <h2 className="projects-title">MY PROJECTS</h2>


        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
              {project.image ? (
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                  />
                </div>
              ) : (
                <div className="project-image project-image-placeholder">
                  <span className="placeholder-text">{project.title}</span>
                </div>
              )}
              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    VIEW CODE
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    LIVE DEMO
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}