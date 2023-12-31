import { createSlice, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import { getRequestNameFromActionType } from "../../../utils";
import { fetchProducts, fetchProductById, updateProduct, createProduct } from "./ProductsActions";

const initialState = {
  products: [],
  productById: {},
  loading: {},
  error: {},
};

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
