import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3030/users");
      return res.json();
    },
  });

  const makeInstructorMutation = useMutation((userId) =>
    fetch(`http://localhost:3030/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "instructor" }),
    })
  );

  const makeAdminMutation = useMutation((userId) =>
    fetch(`http://localhost:3030/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "admin" }),
    })
  );

  const handleMakeInstructor = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to make this user an Instructor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Instructor!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await makeInstructorMutation.mutateAsync(userId);
        refetch();
        Swal.fire("Done!", "Instructor Updated.", "success");
      }
    });
  };

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to make this user an Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await makeAdminMutation.mutateAsync(userId);
        refetch();
        Swal.fire("Done!", "Admin Updated.", "success");
      }
    });
  };

  // console.log(users);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Manage User</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Name: {user.name}</div>
                      <div className="text-sm opacity-50">
                        Email: {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="bg-gray-200 px-3 py-1 rounded-full inline-block">
                    {user.role}
                  </p>
                </td>
                <td>
                  {!user.role.includes("instructor") ? (
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleMakeInstructor(user._id)}
                    >
                      Make Instructor
                    </button>
                  ) : (
                    <button className="btn btn-xs btn-outline" disabled>
                      Already Instructor
                    </button>
                  )}
                  {!user.role.includes("admin") ? (
                    <button
                      className="ml-4 btn btn-xs btn-primary text-white"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      className="ml-4 btn btn-xs btn-primary text-white"
                      disabled
                    >
                      Already Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
