import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImg from '../assets/headphones.png';

export default function Hero({ onExploreClick }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-subtitle">
          <Sparkles size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle', color: 'var(--accent-cyan)' }} />
          Introducing Aura Soundwave Pro
        </div>
        <h1 className="hero-title">
          The Future of <span>Pure Sound</span> is Here.
        </h1>
        <p className="hero-description">
          Experience hyper-tuned spatial audio, hybrid noise cancellation, and a sleek cyber design. Meticulously engineered for audiophiles who refuse to compromise.
        </p>
        <div className="hero-btns">
          <button className="btn btn-primary" onClick={onExploreClick}>
            Explore Shop <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" onClick={onExploreClick}>
            Learn More
          </button>
        </div>
      </div>
      
      <div className="hero-image-container">
        <div className="hero-image-bg"></div>
        <img 
          src={heroImg} 
          alt="Aura Soundwave Pro Headphones" 
          className="hero-image"
        />
      </div>
    </section>
  );
}
