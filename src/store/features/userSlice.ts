import { createSlice } from "@reduxjs/toolkit";

interface User {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
    role: string;
  } | null;
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return { user: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return { user: null };
  }
};

const saveState = (state: User) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const initialState = loadState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveState(state);
    },
    removeUser: (state) => {
      state.user = null;
      saveState(state);
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice;
