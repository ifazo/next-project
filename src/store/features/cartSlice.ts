import { Product as PrismaProduct } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product extends PrismaProduct {
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
      const existingProduct = state.products.find(
        (product: Product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      saveState(state);
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(
        (product: Product) => product.id !== action.payload.id
      );
      saveState(state);
    },
    clearProducts: (state) => {
      state.products = [];
      saveState(state);
    },
  },
});

export const { addProduct, removeProduct, clearProducts } =
  productSlice.actions;

export default productSlice;
