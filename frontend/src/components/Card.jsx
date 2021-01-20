import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../card.css";
import api from "../stripe_api";

export default function Card() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    api.getProductDetails().then((productDetails) => {
      setAmount(productDetails.amount / 100);
      setCurrency(productDetails.currency);
    });

    // Step 2: Create PaymentIntent over Stripe API
    api
      .createPaymentIntent()
      .then((clientSecret) => {
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      console.log("[error]", payload.error);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      setMetadata(payload.paymentIntent);
      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  };

  const renderSuccess = () => {
    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>
      </div>
    );
  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

	return (
		<div className="sr-root sr-root-card">
			<div className="sr-main">
          		<header className="sr-header">
            <div className="sr-header__logo" />
          </header>
				<form onSubmit={handleSubmit}>
              <h1>
                {currency.toLocaleUpperCase()}{" "}
                ${amount.toLocaleString(navigator.language, {
                  minimumFractionDigits: 2,
                })}/month{" "}
				
              </h1>
              <h4>Deploy CI Professional</h4>

              <div className="sr-combo-inputs">
                <div className="sr-combo-inputs-row">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    autoComplete="cardholder"
                    className="sr-input"
                  />
                </div>

                <div className="sr-combo-inputs-row">
                  <CardElement 
                    className="sr-input sr-card-element"
                    options={options}
                  />
                </div>
              </div>

              {error && <div className="message sr-field-error">{error}</div>}

              <button
                className="btn"
                disabled={processing || !clientSecret || !stripe}
              >
                {processing ? "Processing…" : "Pay"}
              </button>
            </form>
          	</div>

          	<div className="sr-content">
            	<div className="pasha-image-stack">
					<img
						alt=""
						src="https://picsum.photos/280/320?random=1"
						width="140"
						height="160"
					/>
					<img
						alt=""
						src="https://picsum.photos/280/320?random=2"
						width="140"
						height="160"
					/>
					<img
						alt=""
						src="https://picsum.photos/280/320?random=3"
						width="140"
						height="160"
					/>
					<img
						alt=""
						src="https://picsum.photos/280/320?random=4"
						width="140"
						height="160"
					/>
            	</div>
          	</div>
		</div>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
}
