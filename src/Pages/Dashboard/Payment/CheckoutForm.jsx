import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import "./CheckoutForm.css";
import { AuthContextProvider } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handlePaymentSuccess = async () => {
    const classId = cart?.classesId;
    const classesApiUrl = `/classes/${classId}`;
    try {
      const response = await axiosSecure.get(classesApiUrl);

      if (response.status === 200) {
        const classData = response.data;
        const updatedEnrolledStudents = classData.enrolledStudents + 1;

        const updatedClassData = {
          ...classData,
          enrolledStudents: updatedEnrolledStudents,
        };

        await axiosSecure.patch(classesApiUrl, updatedClassData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        cartId: cart?._id,
        classId: cart?.classesId,
        className: cart?.className,
      };
      const enrolled = {
        email: user?.email,
        classId: cart?.classesId,
        className: cart?.className,
        image_url: cart?.image_url,
        instructor: cart?.instructor,
        instructor_email: cart?.instructor_email,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.result && res.data.result.insertedId) {
        }
      });
      axiosSecure.post("/enrollmentClass", enrolled).then((res) => {
        console.log(res.data);
        if (res.data.result && res.data.result.insertedId) {
        }
      });
      //   update enrollment number
      handlePaymentSuccess();
    }
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
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
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500 font-bold">
          Payment Successful : {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
