import React from 'react';
import './Contact.css';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const sectionRef = useScrollReveal();

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      label: 'EMAIL',
      value: 'siddharthv210106@gmail.com',
      href: 'mailto:siddharthv210106@gmail.com',
    },
    {
      icon: 'fas fa-phone',
      label: 'PHONE',
      value: '+91 9422551667',
      href: 'tel:+919422551667',
    },
    {
      icon: 'fab fa-linkedin',
      label: 'LINKEDIN',
      value: 'Siddharth Vishwakarma',
      href: 'https://www.linkedin.com/in/siddharth-vishwakarma-54971823b/',
    },
    {
      icon: 'fab fa-github',
      label: 'GITHUB',
      value: 'Siddharthv06',
      href: 'https://github.com/Siddharthv06',
    },
  ];

  return (
    <section id="contact" className="contact scroll-reveal" ref={sectionRef}>
      <div className="contact-inner">
        <h2 className="contact-heading">GET IN TOUCH</h2>
        <p className="contact-subtext">
          Have a project in mind or want to collaborate? Let's connect.
        </p>

        <div className="contact-grid">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              className="contact-card"
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <i className={method.icon}></i>
              <span className="contact-card-label">{method.label}</span>
              <span className="contact-card-value">{method.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
