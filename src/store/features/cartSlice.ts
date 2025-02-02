import { Product as PrismaProduct } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product extends PrismaProduct {
  variant: string;
  quantity: number;
}

interface Cart {
  cart: Product[];
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("productState");
    if (serializedState === null) {
      return { products: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return { products: [] };
  }
};

const saveState = (state: Cart) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("productState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const initialState = loadState();

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.products.findIndex(
        (product: Product) =>
          product.id === action.payload.id 
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex] = {
          ...action.payload,
          quantity: action.payload.quantity,
        };
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      saveState(state);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product: Product) => product.id !== action.payload.toString()
      );
      saveState(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.products.find((product: Product) => product.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        saveState(state);
      }
    },
    clearProducts: (state) => {
      state.products = [];
      saveState(state);
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.products;
export const selectCartTotal = (state: RootState) => {
  return state.cart.products.reduce(
    (total: number, product: Product) =>
      total + product.price * product.quantity,
    0
  );
};
export const selectCartItemsCount = (state: RootState) =>
  state.cart.products.length;

export const { addProduct, removeProduct, updateQuantity, clearProducts } =
  productSlice.actions;

export default productSlice;
