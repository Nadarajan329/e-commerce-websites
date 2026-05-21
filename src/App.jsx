import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { products } from './data/products';
import { Search, Heart, ShoppingBag, Terminal, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export default function App() {
  // Tabs & Views
  const [currentTab, setCurrentTab] = useState('home'); // home, shop, about
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lists State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('aura_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('aura_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Drawer / Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filters & Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Increased quantity of ${product.name}`, 'info');
        return prevCart.map((item) => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showToast(`${product.name} added to cart!`);
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCartQty = (productId, qty) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    if (item) {
      showToast(`${item.product.name} removed from cart`, 'error');
    }
  };

  const handleOrderComplete = () => {
    setCart([]);
    showToast("Order placed successfully! Check your inbox.", "success");
  };

  // Wishlist Operations
  const handleWishlistToggle = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prevWishlist) => {
      const isSaved = prevWishlist.some((id) => id === productId);
      if (isSaved) {
        showToast(`${product.name} removed from wishlist`, 'error');
        return prevWishlist.filter((id) => id !== productId);
      } else {
        showToast(`${product.name} saved to wishlist!`, 'success');
        return [...prevWishlist, productId];
      }
    });
  };

  // Category Helper
  const categories = ['All', 'Audio', 'Keyboard', 'Wearables', 'Chargers'];

  // Filtered Products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured (default)
    });

  // Derived variables
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItems = products.filter((p) => wishlist.includes(p.id));

  // Navigation handlers
  const handleExplore = () => {
    setCurrentTab('shop');
    setTimeout(() => {
      const shopEl = document.getElementById('shop-section');
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'error' ? '✕' : '✓'} {toast.message}
          </div>
        ))}
      </div>

      <Header 
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onWishlistToggle={() => setIsWishlistOpen(!isWishlistOpen)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <main className="main-content">
        {currentTab === 'home' && (
          <>
            <Hero onExploreClick={handleExplore} />
            
            {/* Featured Preview */}
            <section className="products-section" id="shop-section">
              <div className="section-header">
                <h2 className="section-title">New Arrivals</h2>
                <button className="btn btn-secondary" onClick={() => setCurrentTab('shop')} style={{ padding: '8px 20px', fontSize: '13px' }}>
                  View All Products
                </button>
              </div>
              
              <div className="products-grid">
                {products.slice(0, 3).map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    isInCart={cart.some((item) => item.product.id === product.id)}
                    onAddToCart={handleAddToCart}
                    onWishlistToggle={handleWishlistToggle}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {currentTab === 'shop' && (
          <div id="shop-section" style={{ marginTop: '90px' }}>
            <div className="shop-controls">
              <div className="shop-bar">
                <div className="search-box">
                  <Search className="search-icon" size={20} />
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search premium tech peripherals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select 
                  className="filter-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Sort by: Customer Rating</option>
                </select>
              </div>

              <div className="category-list">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <section className="products-section">
              <div className="section-header">
                <h2 className="section-title">
                  {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
                </h2>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Showing {filteredProducts.length} items
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="empty-state" style={{ padding: '80px 0' }}>
                  <Search size={64} className="empty-state-icon" />
                  <h3>No products found</h3>
                  <p className="empty-state-text">We couldn't find matches for your search. Try resetting filters.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                    style={{ marginTop: '10px' }}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      isInCart={cart.some((item) => item.product.id === product.id)}
                      onAddToCart={handleAddToCart}
                      onWishlistToggle={handleWishlistToggle}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {currentTab === 'about' && (
          <div style={{ marginTop: '120px', padding: '0 8%' }}>
            <section style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <Cpu size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '15px' }} />
                <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '15px' }}>THE GRID DESIGN LAB</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '16px' }}>
                  Aura was founded in 2026 by a collective of hardware engineers and cyberpunk enthusiasts. Our mission is simple: to manufacture elite desk accessories that balance cybernetic styling with state-of-the-art tactile performance.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '20px 0' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Precision Tuning</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Every keyboard switches are pre-lubricated by hand, headphone acoustics are fine-tuned via spectral sound simulators, and watch frames are milled from aerospace alloy.
                  </p>
                </div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Cybernetic Aesthetics</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Inspired by dark terminal structures and neon horizons. Aura products are designed to make your workspace feel futuristic, active, and alive.
                  </p>
                </div>
              </div>

              <div style={{ background: 'rgba(102, 252, 241, 0.03)', border: '1px dashed var(--accent-cyan)', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>Aura Quality Pledge</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 15px' }}>
                  All items are shipped with fully biodegradable static shielding bags, premium custom sticker kits, and a 2-year full hardware replacement guarantee.
                </p>
                <button className="btn btn-primary" onClick={() => setCurrentTab('shop')}>
                  Browse Hardware Selection
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer 
        onCategoryClick={setSelectedCategory}
        onTabClick={setCurrentTab}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={handleWishlistToggle}
        onAddToCart={handleAddToCart}
        checkInCart={(id) => cart.some((item) => item.product.id === id)}
      />

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isInCart={selectedProduct ? cart.some((item) => item.product.id === selectedProduct.id) : false}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* Checkout Steps Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
