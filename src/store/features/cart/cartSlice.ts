import { Product as PrismaProduct } from "@prisma/client";

interface Product extends PrismaProduct {
  quantity: number;
}
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICartState {
  cart: Product[];
}

const initialState: ICartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id,
      );
    },
    clearProducts: (state) => {
      state.cart = [];
    },
  },
});

export const { addProduct, removeProduct, clearProducts } = cartSlice.actions;

export default cartSlice;
