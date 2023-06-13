import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

const ClassCard = ({ singleClass }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContextProvider);
  const {
    _id,
    className,
    instructor,
    duration,
    capacity,
    enrolledStudents,
    price,
    image_url,
  } = singleClass || {};

  const availableSeat = capacity - enrolledStudents;

  // Add to cart ------------------------------>
  const handleAddToCart = (singleClass) => {
    const {
      _id,
      className,
      instructor,
      duration,
      capacity,
      enrolledStudents,
      price,
      image_url,
    } = singleClass;
    if (user && user.email) {
      const cartClass = {
        classesId: _id,
        className,
        instructor,
        image_url,
        price,
        duration,
        capacity,
        enrolledStudents,
        email: user.email,
      };
      fetch("https://play-guru-server.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Added",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to Add the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  // Check Classes in the cart
  const isInCart =
    Array.isArray(cart) &&
    cart.find &&
    cart.find((cls) => cls.classesId === _id);

  return (
    <div className="relative flex flex-col">
      <img className="h-52 object-cover rounded-lg" src={image_url} alt="" />
      <span className="flex gap-2 absolute top-2 right-2">
        <p className="px-3 py-[1px] rounded-full bg-primary/75 text-white text-sm font-medium">
          {duration}
        </p>
        <p className="px-3 py-[1px] rounded-full bg-primary/75 text-white text-sm font-medium">
          ${price}
        </p>
      </span>
      <h3 className="text-2xl font-bold text-accent my-3">{className}</h3>
      <p className="text-gray-600 font-medium">Instructor: {instructor}</p>
      <p className="text-gray-600 font-medium mb-2 mt-1">
        Available Seat: {availableSeat}
      </p>
      <div className="flex-grow"></div>
      {isInCart ? (
        <button
          onClick={() => handleAddToCart(singleClass)}
          className="btn btn-outline"
          disabled
        >
          Already Added
        </button>
      ) : (
        <button onClick={() => handleAddToCart(singleClass)} className="btn">
          Add to Cart
        </button>
      )}

      <Link to={`classes/${_id}`}>
        <button className="btn btn-primary btn-block mt-2 text-white">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ClassCard;
