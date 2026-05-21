import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Cpu, Menu } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  onCartToggle,
  onWishlistToggle,
  currentTab,
  setCurrentTab
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={() => setCurrentTab('home')}>
        <Cpu size={24} className="logo-icon" style={{ color: 'var(--accent-cyan)' }} />
        AURA<span>.</span>
      </div>

      <ul className="nav-links">
        <li 
          className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          Home
        </li>
        <li 
          className={`nav-item ${currentTab === 'shop' ? 'active' : ''}`}
          onClick={() => setCurrentTab('shop')}
        >
          Shop
        </li>
        <li 
          className={`nav-item ${currentTab === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentTab('about')}
        >
          About
        </li>
      </ul>

      <div className="header-actions">
        <button 
          className="action-btn" 
          onClick={onWishlistToggle}
          title="Wishlist"
        >
          <Heart size={20} />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </button>

        <button 
          className="action-btn" 
          onClick={onCartToggle}
          title="Shopping Cart"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
