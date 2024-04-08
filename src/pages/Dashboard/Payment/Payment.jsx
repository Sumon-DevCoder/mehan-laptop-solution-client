import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripPromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const Payment = () => {
  return (
    <div>
      <h2>tk paisa dao</h2>

      <Elements stripe={stripPromise}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default Payment;
