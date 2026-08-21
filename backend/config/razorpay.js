const Razorpay = require('razorpay');

const key_id = process.env.RAZORPAY_KEY_ID || '';
const key_secret = process.env.RAZORPAY_KEY_SECRET || '';

let razorpayInstance = null;

if (key_id && key_secret) {
  razorpayInstance = new Razorpay({
    key_id,
    key_secret
  });
  console.log('⚡ Razorpay Payment Gateway Initialized from Environment');
} else {
  console.warn('[Payment Notice] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables not set. Using test mode simulator.');
}

const getRazorpayInstance = () => razorpayInstance;

module.exports = {
  getRazorpayInstance,
  key_id
};
