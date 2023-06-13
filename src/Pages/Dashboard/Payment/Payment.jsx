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
      <h2 className="text-3xl ml-8"> Please Make Payment Carefully</h2>
      <div className="flex items-center gap-5 ml-8 mt-8">
        <img
          className="h-12 w-12 object-cover rounded"
          src={filteredItem?.image_url}
          alt=""
        />
        <span>
          <p className="text-xl font-bold">
            Course Name: {filteredItem?.className}
          </p>
          <p>Do you want pay : $ {filteredItem?.price} ?</p>
        </span>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm cart={filteredItem} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
