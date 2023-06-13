import React from "react";
import useEnroll from "../../../hooks/useEnroll";

const EnrollClass = () => {
  const [enroll] = useEnroll();
  console.log(enroll);
  return (
    <div>
      {enroll.length === 0 ? (
        <h1 className="text-2xl font-bold text-center text-gray-500">
          No class in Enrolled class yet ! Please pay first.
        </h1>
      ) : (
        <>
          {" "}
          <h2 className="text-2xl font-bold text-center mb-10">
            Enrolled Classes
          </h2>
          {enroll?.map((singleEnroll) => (
            <div
              className="mb-4 border border-gray-300 p-5 rounded-lg"
              key={singleEnroll?._id}
            >
              <span className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-5">
                  <img
                    className="w-24 h-24 rounded-md object-cover"
                    src={singleEnroll?.image_url}
                    alt=""
                  />
                  <span>
                    <h4 className="text-2xl font-bold mb-2">
                      Course Name: {singleEnroll?.className}
                    </h4>
                    <p>Instructor: {singleEnroll?.instructor}</p>
                  </span>
                </div>
                <button className="btn btn-primary">View Course</button>
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EnrollClass;
