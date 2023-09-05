import { createSlice, createAsyncThunk, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import axiosFetching from "../../API/axiosFetching";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { getRequestNameFromActionType } from "../../utils";

const initialState = {
  products: [],
  productById: {},
  loading: {},
  error: {},
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (productId) => {
    const endPoint=productId ? apiEndpoints.products.byId(productId) : apiEndpoints.products.all
    const response= await axiosFetching.get(endPoint);
    return response.data.data
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const endPoint = apiEndpoints.products.byId(productId);
    const response = await axiosFetching.get(endPoint);
    return response.data.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    await axiosFetching.delete(apiEndpoints.products.byId(productId));
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updatedData }) => {
    const endPoint = apiEndpoints.products.byId(id);
    const response = await axiosFetching.put(endPoint, updatedData);
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
      const response = await axiosFetching.post(apiEndpoints.products.all, productData);
      return response.data.data;
    
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.products = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.productById = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading['products/updateProduct'] = false;
        state.productById = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.products.push(action.payload);
      })
      .addMatcher(
        isAllOf('/products/fetchPending'),
        (state, action) => {
          if (action.type.includes("pending")) {
            const requestName = getRequestNameFromActionType(action?.type, '/pending');
            if (requestName) {
              state.loading[requestName] = true;
              state.error[requestName] = null;
            }
          }
        }
      )
      .addMatcher(
        isAnyOf('/products/fetchRejected'),
        (state, action) => {
          if (action.type.includes("rejected")) {
            state.loading[getRequestNameFromActionType(action?.type, 'rejected')] = false;
            state.error[getRequestNameFromActionType(action?.type, 'rejected')] = null;
          }
        }
      );
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
