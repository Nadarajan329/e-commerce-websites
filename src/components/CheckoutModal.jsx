import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Heart, Check } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, onOrderComplete }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });
  const [errors, setErrors] = useState({});

  // Calculation details
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
    // Clear error
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePaymentChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'cardNumber') {
      // Formatter: Space every 4 digits
      val = val.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (val.length > 19) return;
    }
    if (e.target.name === 'cardExpiry') {
      val = val.replace(/\/?/g, '').replace(/(\d{2})/g, '$1/').trim();
      if (val.endsWith('/')) val = val.slice(0, -1);
      if (val.length > 5) return;
    }
    if (e.target.name === 'cardCvv') {
      val = val.replace(/\D/g, '');
      if (val.length > 3) return;
    }

    setPaymentData({
      ...paymentData,
      [e.target.name]: val
    });
    // Clear error
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateShipping = () => {
    const tempErrors = {};
    if (!shippingData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!shippingData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!shippingData.address.trim()) tempErrors.address = 'Address is required';
    if (!shippingData.city.trim()) tempErrors.city = 'City is required';
    if (!shippingData.zipCode.trim()) tempErrors.zipCode = 'ZIP code is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validatePayment = () => {
    const tempErrors = {};
    if (!paymentData.cardNumber.trim() || paymentData.cardNumber.length < 19) {
      tempErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!paymentData.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(paymentData.cardExpiry)) {
      tempErrors.cardExpiry = 'Expiry date must be MM/YY';
    }
    if (!paymentData.cardCvv.trim() || paymentData.cardCvv.length < 3) {
      tempErrors.cardCvv = 'CVV must be 3 digits';
    }
    if (!paymentData.cardName.trim()) tempErrors.cardName = 'Name on card is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateShipping()) setStep(2);
    } else if (step === 2) {
      if (validatePayment()) {
        setStep(3);
        // Execute callback to clear cart
        onOrderComplete();
      }
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  const mockOrderId = "AUR-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        {step !== 3 && (
          <button className="close-btn" style={{ position: 'absolute', top: '24px', right: '24px' }} onClick={onClose} title="Close">
            <X size={18} />
          </button>
        )}

        <div className="checkout-steps">
          <div className={`step-indicator ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-node">{step > 1 ? <Check size={14} /> : '1'}</div>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step-indicator ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-node">{step > 2 ? <Check size={14} /> : '2'}</div>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
            <div className="step-node">3</div>
            <span className="step-label">Success</span>
          </div>
        </div>

        {step === 1 && (
          <form className="checkout-form" onSubmit={handleNextStep}>
            <h3 className="form-title">Shipping Address</h3>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={shippingData.fullName}
                onChange={handleShippingChange}
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="John Doe" 
              />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={shippingData.email}
                onChange={handleShippingChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="john@example.com" 
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input 
                type="text" 
                name="address" 
                value={shippingData.address}
                onChange={handleShippingChange}
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="123 Cyber Way" 
              />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={shippingData.city}
                  onChange={handleShippingChange}
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  placeholder="Neo City" 
                />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">ZIP / Postal Code</label>
                <input 
                  type="text" 
                  name="zipCode" 
                  value={shippingData.zipCode}
                  onChange={handleShippingChange}
                  className={`form-input ${errors.zipCode ? 'error' : ''}`}
                  placeholder="94016" 
                />
                {errors.zipCode && <span className="form-error">{errors.zipCode}</span>}
              </div>
            </div>

            <div className="checkout-summary-mini">
              <div className="summary-row" style={{ fontSize: '13px' }}>
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row" style={{ fontSize: '14px', fontWeight: '700', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                <span>Total Due</span>
                <span style={{ color: 'var(--accent-cyan)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
              Continue to Payment <ArrowRight size={16} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="checkout-form" onSubmit={handleNextStep}>
            <h3 className="form-title">Payment Information</h3>

            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input 
                type="text" 
                name="cardName" 
                value={paymentData.cardName}
                onChange={handlePaymentChange}
                className={`form-input ${errors.cardName ? 'error' : ''}`}
                placeholder="John Doe" 
              />
              {errors.cardName && <span className="form-error">{errors.cardName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                value={paymentData.cardNumber}
                onChange={handlePaymentChange}
                className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                placeholder="xxxx xxxx xxxx xxxx" 
              />
              {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiration Date</label>
                <input 
                  type="text" 
                  name="cardExpiry" 
                  value={paymentData.cardExpiry}
                  onChange={handlePaymentChange}
                  className={`form-input ${errors.cardExpiry ? 'error' : ''}`}
                  placeholder="MM/YY" 
                />
                {errors.cardExpiry && <span className="form-error">{errors.cardExpiry}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">CVV</label>
                <input 
                  type="password" 
                  name="cardCvv" 
                  value={paymentData.cardCvv}
                  onChange={handlePaymentChange}
                  className={`form-input ${errors.cardCvv ? 'error' : ''}`}
                  placeholder="•••" 
                />
                {errors.cardCvv && <span className="form-error">{errors.cardCvv}</span>}
              </div>
            </div>

            <div className="checkout-summary-mini">
              <div className="summary-row" style={{ fontSize: '13px' }}>
                <span>Grand Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-btns">
              <button type="button" className="btn btn-secondary" onClick={handlePrevStep} style={{ flex: '1', justifyContent: 'center' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: '2', justifyContent: 'center' }}>
                Pay ${total.toFixed(2)} <CheckCircle size={16} />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="success-screen">
            <div className="success-icon-wrapper">
              <Check size={40} />
            </div>
            
            <h2 className="success-title">Payment Confirmed</h2>
            <p className="success-desc">
              Thank you for choosing AURA, <strong>{shippingData.fullName}</strong>. Your order has been placed and is currently being processed.
            </p>

            <div className="success-order-id">
              ORDER ID: {mockOrderId}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              A confirmation email was sent to {shippingData.email}
            </p>

            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '10px' }}>
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
