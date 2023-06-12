import React from "react";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedClass = () => {
  const [cart, refetch] = useCart();
  console.log(cart);

  //   Delete ------------------->
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DCAF27",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3030/carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Selected Class</h2>
      <div className="overflow-x-auto mt-16">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item?._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image_url} alt="Classes image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.className}</div>
                      <div className="text-sm opacity-50">
                        Duration: {item?.duration}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.instructor}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item?.email}
                  </span>
                </td>
                <td>$ {item?.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                  <Link to={`/dashboard/payment/${item?._id}`}>
                    <button className="btn btn-xs btn-success ml-4 text-white">
                      PAY
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClass;
