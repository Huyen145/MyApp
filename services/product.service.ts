import api from "./api";
import { Category } from "@/types/category";

/* ===== PRODUCTS ===== */
export const getAllProducts = () => api.get("/products");

/* ===== CATEGORIES ===== */
export const getAllCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};

/* ===== CRUD PRODUCT ===== */
export const createProduct = (data: any) =>
  api.post("/products", data);

export const updateProduct = (id: number, data: any) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`);
