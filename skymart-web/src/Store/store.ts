import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Feature/AuthSlice";
import CartReducer from "../Feature/CartSlice";
import ProductReducer from "../Feature/ProductSlice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        cart: CartReducer,
        products: ProductReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;