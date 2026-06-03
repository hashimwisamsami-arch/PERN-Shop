import { useMutation, useQuery, useQueryClient } from "`@tanstack/react-query`";
import { createProduct, getAllProducts } from "../lib/api";

export const useProducts = () => {
  const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts });
  return result;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return result;
};
