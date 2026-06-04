import { useMutation, useQuery, useQueryClient } from "`@tanstack/react-query`";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
} from "../lib/api";

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

export const useProduct = (id) => {
  const result = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    //double bang operater
  });
  return result;
};
export const useMyProducts = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};
