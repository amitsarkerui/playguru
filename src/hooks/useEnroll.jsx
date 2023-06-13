import React, { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEnroll = () => {
  const { user, loading } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: enroll = [] } = useQuery({
    queryKey: ["enroll", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/enrollClass?email=${user?.email}`);
      return res.data;
    },
  });

  return [enroll, refetch];
};

export default useEnroll;
