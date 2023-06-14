import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
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

  const handleApprove = (classId) => {
    updateStatusMutation.mutate({ classId, status: "approved" });
  };

  const handleReject = (classId) => {
    updateStatusMutation.mutate({ classId, status: "rejected" });
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
                  Price : {cls.price}
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
                    onClick={() => handleApprove(cls._id)}
                    disabled={
                      cls.status === "approved" || cls.status === "rejected"
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline btn-xs mx-3"
                    onClick={() => handleReject(cls._id)}
                    disabled={
                      cls.status === "approved" || cls.status === "rejected"
                    }
                  >
                    Reject
                  </button>

                  <button className="btn btn-primary btn-xs text-white">
                    Feedback
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
