import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3030/classes");
      return res.json();
    },
  });

  const updateStatusMutation = useMutation(
    async ({ classId, status }) => {
      const res = await axiosSecure.patch(`/classes/${classId}`, {
        status,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update class status");
      }

      return res.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [classId, setClassId] = useState(null);

  const handleApprove = (classId, event) => {
    event.stopPropagation();
    event.preventDefault();
    updateStatusMutation.mutate({ classId, status: "approved" });
    sendFeedback(classId, event);
  };

  const handleReject = (classId, event) => {
    event.stopPropagation();
    event.preventDefault();
    updateStatusMutation.mutate({ classId, status: "rejected" });
    sendFeedback(classId, event);
  };

  const openModal = (classId) => {
    setShowModal(true);
    setClassId(classId);
  };

  const closeModal = () => {
    setShowModal(false);
    setClassId(null);
  };

  const sendFeedback = (classId, event) => {
    event.preventDefault();
    const feedbackText = event.target.elements.feedbackInput.value;

    axiosSecure
      .patch(`/classes/${classId}`, {
        feedback: feedbackText,
      })
      .then((response) => {
        console.log("Feedback sent successfully");
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to send feedback", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage Classes</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Course Name</th>
              <th>Details</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr key={cls._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={cls.image_url} alt="Class" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cls?.className}</div>
                      <div className="text-sm opacity-50">
                        {cls?.instructor}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  Price: {cls.price}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Total Seat: {cls.capacity}
                  </span>
                </td>
                <td>
                  {cls.status === "approved" ? (
                    <p className="bg-success text-white px-3 py-1 rounded-full inline-block">
                      {cls.status}
                    </p>
                  ) : cls.status === "pending" ? (
                    <p className="bg-primary text-white px-3 py-1 rounded-full inline-block">
                      {cls.status}
                    </p>
                  ) : (
                    <p className="bg-red-600 text-white px-3 py-1 rounded-full inline-block">
                      {cls.status}
                    </p>
                  )}
                </td>
                <th>
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={(event) => handleApprove(cls._id, event)}
                    disabled={cls.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline btn-xs mx-3"
                    onClick={(event) => handleReject(cls._id, event)}
                    disabled={cls.status === "rejected"}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary btn-xs text-white"
                    onClick={() => openModal(cls._id)}
                    disabled={cls.status === "approved"}
                  >
                    Feedback
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {showModal && classId && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full"
        >
          <div className="modal-content bg-white rounded-lg shadow-md dark:bg-gray-700">
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Please provide your feedback
              </h3>
              <form
                className="space-y-6"
                onSubmit={(event) => sendFeedback(classId, event)}
              >
                <div>
                  <textarea
                    name="feedbackInput"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type your feedback here"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Send
                </button>
              </form>
              <button
                onClick={closeModal}
                className="w-full mt-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
