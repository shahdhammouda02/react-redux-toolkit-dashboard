import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosFetching from "../../API/axiosFetching";
import Cookies from "js-cookie";

const initialState={
    user:null,
    loading:false,
    error:null
};

export const loginUser = createAsyncThunk('login/loginUser', async ({ email, password }, { reject }) => {
    try {
      const response = await axiosFetching.post('/auth/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { data } = response;
        Cookies.set('token', data.token, { expires: 7 }); 
        return data.user;
      } else {
        return reject('status error');
      }
    } catch (error) {
      return reject('invalid email or password');
    }
  });
  
  const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default LoginSlice.reducer;