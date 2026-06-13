import React from 'react';
import './App.css';
import Navbar from './components/Navbar';   
import Hero from './components/Hero';
import About from './components/About';
import Skill from './components/skill';
import Projects from './components/Projects';
import Footer from './components/footer';

export default function App() {
  return (
    <div className="app-container">
      {/* Simple Gradient Background */}
      <div className="gradient-background"></div>
      
      <div className="app-content">
        <title>Portfolio | Siddharth</title>
        <Navbar/>
        <Hero />
        <About />
        <Skill />
        <Projects />
        <Footer />
        
      </div>
    </div>
  );
}