import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string;
    token: string;
  } | null;
}

const initialState: IUser = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
