import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProductApi, getProducts, getProductsByIdApi, updateProductApi } from '../../api/productApi';

// existing createProduct thunk
export const createProduct = createAsyncThunk(
  'products/create',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await createProductApi(formData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// NEW fetchProducts thunk
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getProducts(); // call your API
      return result.products; // assuming API returns { products: [...] }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// fetchProductById thunk 
export const getProductById = createAsyncThunk(
    'products/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const result = await getProductsByIdApi(id);
            return result.product
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

// update productBy id 
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({id, formData}, { rejectWithValue }) => {
        try {
            const result = await updateProductApi(id, formData);
            console.log('Result.product', result.product)
            return result.product
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    success: false,
    error: null,
    products: [],
    product: null
  },
  reducers: {
    clearProductState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.products.findIndex(
        (p) => p._id === action.payload._id
        );
        if (index !== -1) {
        state.product[index] = action.payload;
        }
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
