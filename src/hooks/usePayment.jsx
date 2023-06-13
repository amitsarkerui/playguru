import React, { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
  const { user, loading } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: payment = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/payment?email=${user?.email}`);
      return res.data;
    },
  });

  return [payment, refetch];
};

export default usePayment;
