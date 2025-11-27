import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  error: '',
  loading: true,
  authorized: false,
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

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthorized: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setError,
  resetPassword,
  setLoading,
  setAuthorized,
} = authslice.actions;
export default authslice.reducer;
