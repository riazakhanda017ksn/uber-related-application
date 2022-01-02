import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const SimpleCardForm = ({ handlePayment }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccessMessage(null);
    } else {
      setPaymentError(null);
      setPaymentSuccessMessage(paymentMethod.id);
      handlePayment(paymentMethod.id);
    }
  };

  return (
    <div className="form-edit">
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe} style={{ marginTop: "20px" }}>
          Pay
        </button>
      </form>

      {paymentError && <p className="need-color">{paymentError}</p>}
      {/* /// */}
      {paymentSuccessMessage && (
        <p className="need-color-for-success">Your payment successfully</p>
      )}
    </div>
  );
};

export default SimpleCardForm;
