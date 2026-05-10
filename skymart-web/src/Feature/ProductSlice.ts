import { createSlice } from "@reduxjs/toolkit";
import {
    getAllCategories,
    getAllProducts,
} from "../Api/productsApi";

type InitialState = {
    products: object[];
    categories: object[];
    productsLoading: boolean;
    categoriesLoading: boolean;
    errors: string[];
    skip: number;
    total: number;
    limit: number;
};

const initialState: InitialState = {
    products: [],
    categories: [],
    productsLoading: false,
    categoriesLoading: false,
    errors: [],
    skip: 0,
    total: 0,
    limit: 8,
};

export const productSlice = createSlice({
    name: "products",
    initialState,

    reducers: {
        addProducts: (state, { payload }) => {
            state.products = payload;
        },

        setCategories: (state, { payload }) => {
            state.categories = payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.productsLoading = true;
            })

            .addCase(getAllProducts.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.skip = payload.skip;
                state.total = payload.total;
                state.limit = payload.limit;
                state.productsLoading = false;
            })

            .addCase(getAllProducts.rejected, (state, { error }) => {
                state.productsLoading = false;
                state.errors.push(
                    error.message || "Failed to fetch products"
                );
            })

            .addCase(getAllCategories.pending, (state) => {
                state.categoriesLoading = true;
            })

            .addCase(getAllCategories.fulfilled, (state, { payload }) => {
                state.categoriesLoading = false;
                state.categories = payload;
            })

            .addCase(getAllCategories.rejected, (state, { error }) => {
                state.categoriesLoading = false;
                state.errors.push(
                    error.message || "Failed to fetch categories"
                );
            });
    },
});

export const {
    addProducts,
    setCategories,
} = productSlice.actions;

export default productSlice.reducer;