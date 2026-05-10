import { createSlice } from "@reduxjs/toolkit";

interface Item {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

interface Cart {
    totalPrice: number;
    totalItems: number;
    cartItems: Item[];
}

const initialState: Cart = {
    totalItems: 0,
    totalPrice: 0,
    cartItems: [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, { payload }: { payload: Omit<Item, "quantity"> }) => {
            const existingItem = state.cartItems.find(
                (item) => item.id === payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    ...payload,
                    quantity: 1,
                });
            }

            state.totalItems += 1;
            state.totalPrice += payload.price;
        },

        removeFromCart: (state, { payload }: { payload: number }) => {
            const item = state.cartItems.find(
                (item) => item.id === payload
            );

            if (item) {
                state.totalItems -= item.quantity;
                state.totalPrice -= item.price * item.quantity;

                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== payload
                );
            }
        },

        increaseQuantity: (state, { payload }: { payload: number }) => {
            const item = state.cartItems.find(
                (item) => item.id === payload
            );

            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },

        decreaseQuantity: (state, { payload }: { payload: number }) => {
            const item = state.cartItems.find(
                (item) => item.id === payload
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalItems -= 1;
                    state.totalPrice -= item.price;
                } else {
                    state.totalItems -= 1;
                    state.totalPrice -= item.price;

                    state.cartItems = state.cartItems.filter(
                        (item) => item.id !== payload
                    );
                }
            }
        },

        emptyCart: () => initialState,
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
} = CartSlice.actions;

export default CartSlice.reducer;