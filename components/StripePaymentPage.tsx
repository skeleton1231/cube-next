// 'use client'
// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { CardElement, Elements, useStripe, useElements, LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js';
// import apiClient from '@/utils/APIClient'; // 确保此导入正确指向您的API客户端

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#aab7c4"
//       }
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a"
//     }
//   }
// };

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
//   const [email, setEmail] = useState('');
//   const [clientSecret, setClientSecret] = useState('');
//   const [cardHolderName, setCardHolderName] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // 添加这一行来处理加载状态
//   const [message, setMessage] = useState<string | null>(null); // 添加这一行来处理消息

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       try {
//         const response = await apiClient.setupIntent(); // 确保此方法返回一个promise，并包含intent对象
//         if (response.intent) {
//           setClientSecret(response.intent.client_secret);
//         } else {
//           console.error('Intent not found in response:', response);
//           setError('Problem fetching payment intent. Please refresh the page.');
//         }
//       } catch (err) {
//         console.error('API call error:', err);
//         setError('Problem fetching payment information. Please check your internet connection and refresh the page.');
//       }
//     };

//     fetchClientSecret();
//   }, []);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     setIsLoading(true); // 在付款处理之前设置加载状态

//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) {
//       setError("Failed to get card information. Please try again.");
//       setIsLoading(false); // 处理失败时停止加载
//       return;
//     }

//     const { setupIntent, error } = await stripe.confirmCardSetup(
//       clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: { name: cardHolderName }
//         }
//       }
//     );

//     if (error) {
//       setError(error.message || "An error occurred while processing your card.");
//       setMessage(error.message || "An error occurred while processing your card."); // 设置错误消息
//       setIsLoading(false); // 处理失败时停止加载
//     } else {
//       setError(null);
//       setMessage("Payment successful!"); // 设置成功消息
//       setIsLoading(false); // 完成后停止加载
//       // Handle successful payment
//       console.log('[PaymentMethod]', setupIntent.payment_method);
//     }
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <LinkAuthenticationElement id="link-authentication-element" />
//       <PaymentElement id="payment-element" />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// // Replace with your actual public key
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

// const StripePaymentPage = () => {
//   return (
//     <Elements stripe={stripePromise} options={{clientSecret: clientSecret}}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default StripePaymentPage;
