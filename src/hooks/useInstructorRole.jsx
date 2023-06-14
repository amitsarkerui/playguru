import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContextProvider } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useInstructorRole = () => {
  const { user, loading } = useContext(AuthContextProvider);
  const [axiosSecure] = useAxiosSecure();

  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
      return res.data.instructor;
    },
  });
  return [isInstructor, isInstructorLoading];
};
export default useInstructorRole;
