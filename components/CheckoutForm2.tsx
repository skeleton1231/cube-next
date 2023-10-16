import React, { useState, FormEvent } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './CheckoutForm2.module.css';


interface CheckoutFormProps {
}

const CheckoutForm2: React.FC<CheckoutFormProps> = () => {
  const stripe = useStripe();
  const elements = useElements(); // 这些Hooks现在无条件地在每次渲染时被调用
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred during the payment process.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else {
      // Handle the case when there's no error, if necessary
      setMessage(null);
    }

    setIsLoading(false);
  };

  const buttonStyle = {
    background: '#5469d4',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    borderRadius: '4px',
    border: '0',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'block',
    transition: 'all 0.2s ease',
    boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
    width: '100%',
    opacity: isLoading || !stripe || !elements ? '0.5' : '1', // 用条件逻辑来处理“disabled”状态的样式变化
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button style={buttonStyle} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm2;
