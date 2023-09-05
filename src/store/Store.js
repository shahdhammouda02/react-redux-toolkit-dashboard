import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/ProductsSlice";
import categoriesReducer from "./slices/CategoriesSlice"
import loginReducer from "./slices/LoginSlice"

const Store=configureStore({
  
  reducer:{
    products: productsReducer,
    categories: categoriesReducer,
    login: loginReducer 
  }
})

export default Store