import React, { useContext } from "react";
import { AuthContextProvider } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyClasses = () => {
  const { user } = useContext(AuthContextProvider);
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3030/classes");
      return res.json();
    },
  });
  const instructorClasses = classes.filter(
    (singleClass) => singleClass.instructor_email === user.email
  );
  //   console.log("ins class---->", instructorClasses);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">My Classes</h1>
      <div>
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
                <th>FeedBack</th>
              </tr>
            </thead>
            <tbody>
              {instructorClasses.map((sc, index) => (
                <tr key={sc._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={sc?.image_url} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{sc.className}</div>
                        <div className="text-sm opacity-50">
                          Price: ${sc?.price}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Location: {sc?.location}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Total Seat: {sc?.capacity}
                    </span>
                  </td>
                  <td>
                    {sc.status === "approved" ? (
                      <p className="bg-success text-white px-3 py-1 rounded-full inline-block">
                        {sc.status}
                      </p>
                    ) : sc.status === "pending" ? (
                      <p className="bg-primary text-white px-3 py-1 rounded-full inline-block">
                        {sc.status}
                      </p>
                    ) : (
                      <p className="bg-red-600 text-white px-3 py-1 rounded-full inline-block">
                        {sc.status}
                      </p>
                    )}
                  </td>
                  <th>
                    <p>{sc.feedback ? sc.feedback : "No Feedback"}</p>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
