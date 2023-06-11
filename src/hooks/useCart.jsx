import React, { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user, loading } = useContext(AuthContextProvider);
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3030/carts?email=${user.email}`
      );
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
