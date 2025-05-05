import { createSlice } from "@reduxjs/toolkit";

const initialState={
    //to check the user is logged in in or not based on this condition we will change ui for logged in user logout for not logged in user signin and signup
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem("role")||"",
    data:localStorage.getItem("data") || {}
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
});

export const{}=authSlice.actions;
export default authSlice.reducer;