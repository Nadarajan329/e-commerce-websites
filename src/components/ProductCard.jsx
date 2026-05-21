import React from 'react';
import { Star, Heart, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  isInCart,
  onAddToCart,
  onWishlistToggle,
  onViewDetails
}) {
  const { name, category, price, image, rating, reviewsCount, description } = product;

  return (
    <div className="product-card">
      <div className="card-img-wrapper" onClick={() => onViewDetails(product)}>
        <span className="card-category">{category}</span>
        
        <button 
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product.id);
          }}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <img src={image} alt={name} className="card-img" />
      </div>

      <div className="card-body">
        <div className="card-rating">
          <Star size={14} fill="currentColor" />
          <span>{rating} ({reviewsCount})</span>
        </div>

        <h3 className="card-title" onClick={() => onViewDetails(product)}>
          {name}
        </h3>
        
        <p className="card-description">
          {description}
        </p>

        <div className="card-footer">
          <div className="card-price">{price.toFixed(2)}</div>
          
          <button 
            className={`card-cart-btn ${isInCart ? 'added' : ''}`}
            onClick={() => onAddToCart(product)}
            title={isInCart ? "Already in Cart" : "Add to Cart"}
          >
            {isInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
