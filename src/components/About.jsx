import React from "react";
import "./About.css";
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
    const sectionRef = useScrollReveal();

    return (
        <section id="about" className="about-container scroll-reveal" ref={sectionRef}>
            <h2 className="about-title">ABOUT ME</h2>

            <div className="about-content">
                <div className="about-columns">
                    <div className="about-left">
                        <p className="about-intro">
                            I'm a Full Stack Developer and AI Engineer who thrives at the
                            intersection of clean code and creative problem-solving.
                        </p>
                        <p className="about-intro about-intro-secondary">
                            I build things that work beautifully — from machine learning models
                            with 98% accuracy to pixel-perfect user interfaces. If it can be
                            coded, I'll ship it.
                        </p>
                    </div>

                    <div className="about-right">
                        <div className="about-detail">
                            <span className="detail-icon">▸</span>
                            <div>
                                <span className="detail-label">STACK</span>
                                <span className="detail-value">React, FastAPI, NextJS, Flutter, Python</span>
                            </div>
                        </div>
                        <div className="about-detail">
                            <span className="detail-icon">▸</span>
                            <div>
                                <span className="detail-label">AI / ML</span>
                                <span className="detail-value">TensorFlow, Keras, OpenCV, PyTorch</span>
                            </div>
                        </div>
                        <div className="about-detail">
                            <span className="detail-icon">▸</span>
                            <div>
                                <span className="detail-label">DEPLOY</span>
                                <span className="detail-value">AWS, Docker, CI/CD</span>
                            </div>
                        </div>
                        <div className="about-detail">
                            <span className="detail-icon">▸</span>
                            <div>
                                <span className="detail-label">MOTTO</span>
                                <span className="detail-value">Always learning, Adaptibility is key</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-stats">
                    <div className="stat-card">
                        <span className="stat-number">20+</span>
                        <span className="stat-label">PROJECTS</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">98%</span>
                        <span className="stat-label">AI ACCURACY</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">10+</span>
                        <span className="stat-label">TECHNOLOGIES</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">3+</span>
                        <span className="stat-label">YEARS CODING</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
