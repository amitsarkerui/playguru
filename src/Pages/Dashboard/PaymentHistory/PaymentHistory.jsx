import React from "react";
import usePayment from "../../../hooks/usePayment";

const PaymentHistory = () => {
  const [payment] = usePayment();
  return (
    <div>
      {payment.length === 0 ? (
        <>
          <h1 className="text-2xl font-bold text-center text-gray-500">
            No transaction yet !
          </h1>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-10">
            Payment History
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {" "}
            {payment?.map((singlePay) => (
              <div className="border border-gray-300 rounded-md p-4">
                <h4>Course Name : {singlePay?.className}</h4>
                <p>Date: {singlePay?.date}</p>
                <p>
                  Transaction id :{" "}
                  <span className="bg-primary py-1 px-4 rounded-md text-white mt-5">
                    {singlePay?.transactionId}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
