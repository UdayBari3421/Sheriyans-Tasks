import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./AxiosInstance";

type GetAllProductsParams = {
    limit?: number;
    skip?: number;
    search?: string;
    category?: string;
};

type GetAllProductsResponse = {
    products: object[];
    limit: number;
    skip: number;
    total: number;
};

export const getAllProducts = createAsyncThunk<
    GetAllProductsResponse,
    GetAllProductsParams
>(
    "getAllProducts",
    async ({
        limit = 8,
        skip = 0,
        search = "",
        category = "",
    }) => {
        try {
            let url = "/products";

            if (search) {
                url = `/products/search?q=${encodeURIComponent(
                    search
                )}&limit=${limit}&skip=${skip}`;
            } else if (category) {
                url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
            } else {
                url = `/products?limit=${limit}&skip=${skip}`;
            }

            const res = await axiosInstance.get(url);

            if (res.status === 200) {
                const {
                    products,
                    limit,
                    skip,
                    total,
                } = res.data;

                return {
                    products,
                    limit,
                    skip,
                    total,
                };
            }

            throw new Error("Failed to fetch products");
        } catch (error) {
            throw error;
        }
    }
);

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try {
            const res = await axiosInstance.get("/products/categories");

            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            return error;
        }
    }
);

export const getProductByCategory = createAsyncThunk(
    "getProductByCategory",
    async (selectedCategory: string) => {
        try {
            const res = await axiosInstance.get(
                `/category/${selectedCategory}`
            );

            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            return error;
        }
    }
);