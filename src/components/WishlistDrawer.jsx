import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onAddToCart,
  checkInCart
}) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose} style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <Heart size={22} fill="var(--accent-pink)" style={{ color: 'var(--accent-pink)' }} />
            Your Wishlist
          </div>
          <button className="close-btn" onClick={onClose} title="Close Wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {wishlistItems.length === 0 ? (
            <div className="empty-state">
              <Heart size={64} className="empty-state-icon" style={{ color: 'var(--accent-pink)', opacity: 0.3 }} />
              <h3>Your wishlist is empty</h3>
              <p className="empty-state-text">Tap the heart on any product card to save your favorite accessories here.</p>
              <button 
                className="btn btn-secondary" 
                onClick={onClose}
                style={{ marginTop: '10px' }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlistItems.map((product) => {
              const inCart = checkInCart(product.id);
              return (
                <div key={product.id} className="drawer-item">
                  <div className="item-img-wrapper">
                    <img src={product.image} alt={product.name} className="item-img" />
                  </div>
                  
                  <div className="item-details">
                    <h4 className="item-name">{product.name}</h4>
                    <div className="item-price">{product.price.toFixed(2)}</div>
                    
                    <button 
                      className="btn btn-primary" 
                      onClick={() => onAddToCart(product)}
                      disabled={inCart}
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '12px', 
                        borderRadius: '6px', 
                        marginTop: '8px', 
                        width: 'fit-content',
                        background: inCart ? 'rgba(102, 252, 241, 0.1)' : 'var(--accent-cyan)',
                        color: inCart ? 'var(--accent-cyan)' : 'var(--bg-primary)',
                        border: inCart ? '1px solid var(--accent-cyan)' : 'none'
                      }}
                    >
                      {inCart ? 'In Cart' : (
                        <>
                          Add <ShoppingCart size={12} style={{ marginLeft: '4px' }} />
                        </>
                      )}
                    </button>
                  </div>

                  <button 
                    className="item-remove-btn" 
                    onClick={() => onRemoveItem(product.id)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
