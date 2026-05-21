import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckoutClick
}) {
  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
  const tax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + shipping + tax;

  return (
    <div className="overlay" onClick={onClose} style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={22} style={{ color: 'var(--accent-cyan)' }} />
            Your Cart
          </div>
          <button className="close-btn" onClick={onClose} title="Close Cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={64} className="empty-state-icon" />
              <h3>Your cart is empty</h3>
              <p className="empty-state-text">Explore our collection and add premium gear to your workspace.</p>
              <button 
                className="btn btn-secondary" 
                onClick={onClose}
                style={{ marginTop: '10px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="drawer-item">
                <div className="item-img-wrapper">
                  <img src={item.product.image} alt={item.product.name} className="item-img" />
                </div>
                
                <div className="item-details">
                  <h4 className="item-name">{item.product.name}</h4>
                  <div className="item-price">{(item.product.price * item.quantity).toFixed(2)}</div>
                  
                  <div className="qty-controls">
                    <button 
                      className="qty-btn" 
                      onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                      title="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                      title="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <button 
                  className="item-remove-btn" 
                  onClick={() => onRemoveItem(item.product.id)}
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-price">{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>FREE</span>
              ) : (
                <span className="summary-price">{shipping.toFixed(2)}</span>
              )}
            </div>

            <div className="summary-row">
              <span>Estimated Tax (8%)</span>
              <span className="summary-price">{tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span className="summary-price" style={{ color: 'var(--accent-cyan)', fontSize: '20px' }}>{total.toFixed(2)}</span>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={onCheckoutClick}
              style={{ marginTop: '10px', justifyContent: 'center' }}
            >
              Checkout Now <CreditCard size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
