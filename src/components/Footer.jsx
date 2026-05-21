import React, { useState } from 'react';
import { Cpu, Globe, MessageSquare, Mail, Send } from 'lucide-react';

export default function Footer({ onCategoryClick, onTabClick }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo" onClick={() => onTabClick('home')}>
            <Cpu size={22} style={{ color: 'var(--accent-cyan)' }} />
            AURA<span>.</span>
          </div>
          <p className="footer-desc">
            Designing premium, cyber-inspired desktop peripherals and lifestyle technology products for enthusiasts worldwide.
          </p>
          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Website">
              <Globe size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Community">
              <MessageSquare size={16} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Tech Lab">
              <Cpu size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Shop Peripherals</h4>
          <ul className="footer-links">
            <li className="footer-link" onClick={() => { onTabClick('shop'); onCategoryClick('Audio'); }}>Audio</li>
            <li className="footer-link" onClick={() => { onTabClick('shop'); onCategoryClick('Keyboard'); }}>Keyboards</li>
            <li className="footer-link" onClick={() => { onTabClick('shop'); onCategoryClick('Wearables'); }}>Wearables</li>
            <li className="footer-link" onClick={() => { onTabClick('shop'); onCategoryClick('Chargers'); }}>Power Accessories</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li className="footer-link" onClick={() => onTabClick('about')}>About Us</li>
            <li className="footer-link">Support Desk</li>
            <li className="footer-link">Privacy Policy</li>
            <li className="footer-link">Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Newsletter</h4>
          <p className="footer-desc" style={{ fontSize: '13px' }}>
            Subscribe to receive product drops, beta testing releases, and exclusive cyber discounts.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              {subscribed ? 'Subbed!' : <Send size={14} />}
            </button>
          </form>
          {subscribed && (
            <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', display: 'block', animation: 'fadeIn 0.3s' }}>
              Welcome to the grid. Check your inbox!
            </span>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AURA Inc. All rights reserved.</p>
        <div className="footer-bottom-links">
          <span>Security</span>
          <span>Sitemap</span>
          <span>Status</span>
        </div>
      </div>
    </footer>
  );
}
