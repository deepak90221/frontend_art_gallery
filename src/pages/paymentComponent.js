import { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [amount] = useState(500); // Example amount

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const result = await axios.post('/api/payment/order', { amount });
      const { amount: orderAmount, id: order_id, currency } = result.data;

      const options = {
        amount: orderAmount,
        currency: currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async (response) => {
          try {
            const data = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
            };

            const result = await axios.post('/api/payment/verify', data);
            alert(result.data.message);
          } catch (error) {
            console.error(error);
            alert('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Your Address',
        },
        theme: {
          color: '#61dafb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Payment order creation failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Razorpay Payment Gateway</h2>
      <button onClick={handlePayment}>Pay {amount}</button>
    </div>
  );
};

export default PaymentComponent;
