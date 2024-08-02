import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  (builder) =>
    builder
      .addCase("addCartItem", (state, action) => {
        const item = action.payload;
        const doesItemAlreadyExist = state.cartItems.find(
          (i) => i.id === item.id
        );
        if (doesItemAlreadyExist) {
          state.cartItems.forEach((i) => {
            if (i.id === item.id) i.quantity += 1;
          });
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase("decrement", (state, action) => {
        const id = action.payload;
        state.cartItems.forEach((i) => {
          if (i.id === id && i.quantity > 1) i.quantity -= 1;
        });
      })
      .addCase("deleteItem", (state, action) => {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      })
      .addCase("calculatePrice", (state) => {
        let sum = 0;
        state.cartItems.forEach((item) => (sum += item.price * item.quantity));
        state.subtotal = sum;
        state.shipping = state.subtotal < 1000 ? 0 : 100;
        state.tax = +(state.subtotal * 0.18).toFixed();
        state.total = state.subtotal + state.shipping + state.tax;
      })
);
