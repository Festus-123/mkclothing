import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  email: '',
  password: '',
  error: '',
};

const authslice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetPassword: () => initialState,
  },
});

export const { setName, setEmail, setPassword, setError, resetPassword } =
  authslice.actions;
export default authslice.reducer;
