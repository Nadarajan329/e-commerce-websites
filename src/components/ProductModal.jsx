import React from 'react';
import { X, Star, Heart, ShoppingCart, Check, ShieldCheck } from 'lucide-react';

export default function ProductModal({
  product,
  onClose,
  isInCart,
  onAddToCart,
  isWishlisted,
  onWishlistToggle
}) {
  if (!product) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn detail-modal-close" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        <div className="detail-grid">
          <div className="detail-gallery">
            <img src={product.image} alt={product.name} className="detail-img" />
          </div>

          <div className="detail-info">
            <div>
              <span className="detail-category">{product.category}</span>
              <h2 className="detail-title">{product.name}</h2>
              
              <div className="detail-rating" style={{ marginTop: '8px' }}>
                <Star size={16} fill="currentColor" />
                <span>{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="detail-price">{product.price.toFixed(2)}</div>

            <p className="detail-desc">{product.description}</p>

            <div className="detail-features">
              <span className="spec-title">Key Highlights</span>
              {product.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <ShieldCheck size={16} className="feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="detail-specs">
              <span className="spec-title">Technical Specifications</span>
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="spec-row">
                  <span className="spec-label">{key}</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>

            <div className="detail-actions">
              <button 
                className={`btn btn-primary detail-btn-cart ${isInCart ? 'added' : ''}`}
                onClick={() => onAddToCart(product)}
              >
                {isInCart ? (
                  <>
                    <Check size={18} /> In Your Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button 
                className={`action-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onWishlistToggle(product.id)}
                style={{ height: '48px', width: '48px', borderRadius: '12px' }}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} style={{ color: isWishlisted ? 'var(--accent-pink)' : 'inherit' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
