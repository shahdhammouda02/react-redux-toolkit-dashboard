import { createSlice, createAsyncThunk, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import axiosFetching from "../../API/axiosFetching";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { getRequestNameFromActionType } from "../../utils";

const initialState={
    categories:[],
    categoryById:{},
    loading:{},
    error:{}
}

export const fetchCategories=createAsyncThunk('categories/fetchCategories', 
    async(categoryId)=>{
      const endPoint=categoryId ? apiEndpoints.categories.byId(categoryId) : apiEndpoints.categories.all
     
      const response= await axiosFetching.get(endPoint);
      return response.data.data
});

export const fetchCategoryById=createAsyncThunk('categories/fetchCategoryById', async(categoryId)=>{
  const endPoint=apiEndpoints.categories.byId(categoryId);
  const response=await axiosFetching.get(endPoint)
  return response.data.data
})

export const deleteCategory=createAsyncThunk('categories/deleteCategory', async(categoryId)=>{
  // console.log(categoryId);

    await axiosFetching.delete(apiEndpoints.categories.byId(categoryId))
    
});

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }) => {
    const endPoint = apiEndpoints.categories.byId(id);
    const response = await axiosFetching.put(endPoint, updatedData);
    return response.data.data;
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
      const response = await axiosFetching.post(apiEndpoints.categories.all, categoryData);
      return response.data.data;
    
  }
);

const CategoriesSlice=createSlice({
    name:"categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false
        state.categories = action.payload;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.categoryById = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading['categories/updateCategory'] = false;
        state.categoryById = action.payload; 
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading[getRequestNameFromActionType(action?.type)] = false;
        state.categories.push(action.payload);
      })
        .addMatcher(
          isAllOf(
            '/categories/fetchPending',
          ),
          (state, action) => {
           if(action.type.includes("pending")){
            const requestName =  getRequestNameFromActionType(action?.type,'/pending') 
            if(requestName){
              state.loading[requestName] = true
              state.error[requestName] = null;
            }
           }
          }
        )
        .addMatcher(
          isAnyOf(
            '/categories/fetchRejected'
            ),
          (state, action) => {
              if(action.type.includes("rejected")){
                state.loading[getRequestNameFromActionType(action?.type,'rejected')] = false
                state.error[getRequestNameFromActionType(action?.type,'rejected')] = null
              }
           
          }
        )
       
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
  } = CategoriesSlice.actions;
  
  export default CategoriesSlice.reducer;