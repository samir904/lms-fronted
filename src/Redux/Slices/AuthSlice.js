import { createSlice } from "@reduxjs/toolkit";

//This starts defining the starting point (initial state) for our user login information. It’s like setting up a default situation before anything happens.
const initialState={
    //to check the user is logged in in or not based on this condition we will change ui for logged in user logout for not logged in user signin and signup
    //This checks if the user is logged in. It looks in localStorage (a place in the browser to store data) for a value called isLoggedIn. If it’s the string "true", set isLoggedIn to true. If not, set it to false.
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem("role")||"",
    data:localStorage.getItem("data") || {}
}

//This creates a "slice" (a section of our app’s state) for authentication (login/logout stuff) using the createSlice tool.
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
});

export const{}=authSlice.actions;
export default authSlice.reducer;