import React from "react";
import "./About.css";

export default function About() {
    return (
        <section id="about" className="about-container">
            <h2 className="about-title">ABOUT ME</h2>
            
            <div className="about-content">
                <ul className="about-list">
                    <li>Full Stack Developer with passion for clean code</li>
                    <li>Love building perfect user interfaces</li>
                    <li>Experience with React, Python, NextJS, FastAPI</li>
                    <li>AWS for deployment and scaling</li>
                    <li>Always learning new technologies and frameworks</li>
                    <li>Believe in turning ideas into digital reality</li>
                </ul>
            </div>
        </section>
    );
}