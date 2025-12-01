import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductApi } from "../../api/productApi";

export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await createProductApi(formData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    success: false,
    error: null,
    products: [],
  },
  reducers: {
    clearProductState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload.product); // optional depending on API return
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
