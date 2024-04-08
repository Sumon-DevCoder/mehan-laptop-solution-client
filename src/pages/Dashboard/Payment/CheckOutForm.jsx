import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import useAuthContext from "../../../hooks/useAuthContext";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const [carts, refetch] = useCarts();
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const totalPrice = carts.reduce((prev, item) => prev + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error);
    } else {
      console.log("payment method", paymentMethod);
    }

    // confirm  payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent?.id);

        // now save payment in database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: carts.map((item) => item?._id),
          laptopItemIds: carts.map((item) => item?.laptop_id),
          status: "pending",
        };

        const res = await axiosSecure.post("/payment", payment);
        console.log(res.data);

        if (
          res.data.deletedResult.deletedCount > 0 ||
          res.data.paymentResult.insertedId
        ) {
          // alert
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thank you for tk poisa",
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch
          refetch();
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        {carts.length === 0 ? (
          <button className="btn btn-primary btn-sm" type="submit" disabled>
            Pay
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        )}

        {error && <p className="text-red-400 font-bold">{error}</p>}
        {transactionId && (
          <p className="text-green-400 font-bold">
            TransactionId is: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
