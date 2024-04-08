import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useLaptops = () => {
  const axiosPublic = useAxiosPublic();
  const { data: laptops = [], refetch } = useQuery({
    queryKey: ["laptops"],
    queryFn: async () => {
      const res = await axiosPublic.get("/laptops");
      return res.data;
    },
  });

  return [laptops, refetch];
};

export default useLaptops;
