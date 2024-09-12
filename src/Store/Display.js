import { createSlice } from "@reduxjs/toolkit";
const Display=createSlice({
    name:'Display',
    initialState:{loading:false,error:false,displayLink:false},
    reducers:{
        loadingHandler(state){
            state.loading=!state.loading
        },
        errorHandler(state){
             state.error=!state.error
        },
        displayLinkHandler(state){
            state.displayLink=!state.displayLink
        }
    }
})
export const displayActions=Display.actions;
export default Display.reducer;