import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
const Payment = () => {
  const [cart] = useCart();
  //   console.log(cart);
  const { id } = useParams();
  //   console.log(id);
  const filteredItem = cart.find((item) => item._id == id);
  const price = filteredItem?.price;
  //   console.log("payment------>", filteredItem, price);
  return (
    <div>
      <h2 className="text-3xl"> Please Make Payment Carefully</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={filteredItem} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
