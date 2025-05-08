import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstace.js"
import toastStyles from "../../Helper/Toaststyle.js";
//This starts defining the starting point (initial state) for our user login information. It’s like setting up a default situation before anything happens.
const initialState={
    //to check the user is logged in in or not based on this condition we will change ui for logged in user logout for not logged in user signin and signup
    //This checks if the user is logged in. It looks in localStorage (a place in the browser to store data) for a value called isLoggedIn. If it’s the string "true", set isLoggedIn to true. If not, set it to false.
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem("role")||"",
    data:JSON.parse( localStorage.getItem("data") )|| {}//string to js object json.parse
}

export const createAccount=createAsyncThunk("/auth/signup",async(data)=>{
  try{
    const res=axiosInstance.post("user/register",data)
     
    toast.promise(res,{
      loading:"wait creating your account",
      success:(data)=>{
        return data?.data?.message || "Account created successfully!";
      },
      error:"Failed to create account"
    },{
      loading: toastStyles.loading,
      success: toastStyles.success,
      error: toastStyles.error,
  })
    return (await res).data;
  }catch(e){
    toast.error(e?.reponse?.data?.message)
  }
})

export const login=createAsyncThunk("/auth/login",async(data)=>{
  try{
    const res=axiosInstance.post("user/login",data);
    toast.promise(res,{
      loading:"Wait authentication in process",
      success:(data)=>{
        return data?.data?.message || "user loggedin successfully"
      },
      error:"failed to loggedin"
    },{
      loading:toastStyles.loading,
      success:toastStyles.success,
      error:toastStyles.error
    })
    return (await res).data;
  }catch(error){
    toast.error(error?.response?.data?.message,toastStyles.error);
  }
})

export const logout=createAsyncThunk("/auth/logout",async()=>{
  try{
    const res=axiosInstance.get("user/logout")
    toast.promise(res,{
      loading:"wait logout in process",
      success:(data)=>{
        return data?.data?.message ||"user loggeout successfully "
      },
     error:"failed to logout"
    },{
      loading:toastStyles.loading,
      success:toastStyles.success,
      error:toastStyles.error
    })
    return (await res).data;
  }catch(error){
    toast.error(error?.response?.data?.message,toastStyles.error)
  }
})

//This creates a "slice" (a section of our app’s state) for authentication (login/logout stuff) using the createSlice tool.
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      //login fullfilled hone pe ek reducer object bannani hai 
      builder.addCase(login.fulfilled,(state,action)=>{
        localStorage.setItem("data",JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("role",action?.payload?.user?.role);
        state.isLoggedIn=true;
        state.data=action?.payload?.user;
        state.role=action?.payload?.user?.role
      })
      builder.addCase(logout.fulfilled,(state)=>{
        localStorage.clear();
        state.data={};
        state.isLoggedIn=false;
        state.role="";
      })
    }
});

export const{}=authSlice.actions;
export default authSlice.reducer;

/*
Let’s explain how data is retrieved from `localStorage` in the provided Redux Toolkit slice code in very simple words, focusing on the lines that get data from `localStorage`. I’ll also explain what `localStorage` is and how it works in this context.

---

### What is `localStorage`?
- `localStorage` is a built-in feature in web browsers that lets you store small amounts of data (like text) in the user’s browser.
- This data stays even if the user closes the browser or refreshes the page, unlike regular JavaScript variables that disappear.
- It’s like a tiny notebook in the browser where you can save and read information (e.g., whether a user is logged in).

In the code, `localStorage` is used to store and retrieve three pieces of information:
1. `isLoggedIn` (whether the user is logged in).
2. `role` (the user’s role, like "admin" or "user").
3. `data` (user details, like name or email).

---

### The Code That Gets Data from `localStorage`
This happens in the `initialState` definition:

```javascript
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};
```

Let’s break down each line:

---

#### 1. `isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false`
- **What it does**: This checks if the user is logged in by looking for a value called `isLoggedIn` in `localStorage`.
- **Step-by-step**:
  - `localStorage.getItem('isLoggedIn')`:
    - This asks the browser, “Do you have a value saved under the name `isLoggedIn` in `localStorage`?”
    - If there is a value (e.g., the string `"true"`), it returns that value.
    - If there’s nothing saved, it returns `null`.
  - `=== 'true'`:
    - Since `localStorage` only stores strings, we check if the value is exactly the string `"true"`.
    - If it is `"true"`, the result is `true` (a boolean).
    - If it’s anything else (like `null` or another string), the result is `false`.
  - `|| false`:
    - If `localStorage.getItem('isLoggedIn')` returns `null` (meaning no value was saved), this sets `isLoggedIn` to `false` as a default.
- **Example**:
  - If `localStorage` has `isLoggedIn` set to `"true"`, then `isLoggedIn` becomes `true`.
  - If `localStorage` has nothing or something else (like `"false"`), `isLoggedIn` becomes `false`.
- **Why?**: This ensures `isLoggedIn` is a boolean (`true` or `false`) so the app knows if the user is logged in when it starts.

---

#### 2. `role: localStorage.getItem("role") || ""`
- **What it does**: This gets the user’s role (like "admin" or "user") from `localStorage`.
- **Step-by-step**:
  - `localStorage.getItem("role")`:
    - This asks the browser, “Do you have a value saved under the name `role` in `localStorage`?”
    - If there is a value (e.g., the string `"admin"`), it returns that string.
    - If there’s nothing saved, it returns `null`.
  - `|| ""`:
    - If `localStorage.getItem("role")` returns `null` (no value saved), this sets `role` to an empty string (`""`) as a default.
    - If there’s a value (like `"admin"`), it uses that value.
- **Example**:
  - If `localStorage` has `role` set to `"admin"`, then `role` becomes `"admin"`.
  - If `localStorage` has nothing, `role` becomes `""`.
- **Why?**: This ensures `role` is always a string, so the app knows the user’s role (or no role if empty).

---

#### 3. `data: JSON.parse(localStorage.getItem("data")) || {}`
- **What it does**: This gets the user’s data (like their name or email) from `localStorage` and turns it into an object.
- **Step-by-step**:
  - `localStorage.getItem("data")`:
    - This asks the browser, “Do you have a value saved under the name `data` in `localStorage`?”
    - If there is a value (e.g., a string like `"{\"name\":\"John\",\"email\":\"john@example.com\"}"`), it returns that string.
    - If there’s nothing saved, it returns `null`.
  - `JSON.parse(...)`:
    - Since `localStorage` stores data as strings, but we want an object (like `{name: "John", email: "john@example.com"}`), we use `JSON.parse()` to convert the string into a JavaScript object.
    - For example, `"{\"name\":\"John\"}"` becomes `{name: "John"}`.
    - If the input is `null` (no value in `localStorage`), `JSON.parse(null)` will throw an error, but we handle that with the `||` operator.
  - `|| {}`:
    - If `localStorage.getItem("data")` returns `null` or if `JSON.parse` fails, this sets `data` to an empty object (`{}`) as a default.
    - If `JSON.parse` succeeds, it uses the parsed object.
- **Example**:
  - If `localStorage` has `data` set to `"{\"name\":\"John\",\"email\":\"john@example.com\"}"`, then `data` becomes `{name: "John", email: "john@example.com"}`.
  - If `localStorage` has nothing, `data` becomes `{}`.
- **Why?**: This ensures `data` is always an object, so the app can use it to show user details (or an empty object if no data exists).

---

### How This Fits into the App
- When the app starts, the `initialState` is used to set up the Redux store (the place where the app keeps its state).
- These `localStorage` checks happen right at the start to load any saved login information.
- For example:
  - If the user logged in before and `localStorage` has `isLoggedIn: "true"`, `role: "admin"`, and `data: "{\"name\":\"John\"}"`, the app will start with:
    - `isLoggedIn: true`
    - `role: "admin"`
    - `data: {name: "John"}`
  - This means the app knows the user is logged in and can show the right UI (e.g., a "Logout" button instead of "Sign In").
- If there’s no data in `localStorage` (e.g., the user never logged in or logged out), the defaults (`false`, `""`, `{}`) are used, and the app assumes the user is not logged in.

---

### Where Does the `localStorage` Data Come From?
The data in `localStorage` is saved when the user logs in (in the `login` action):

```javascript
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('role', action.payload.role);
localStorage.setItem('data', JSON.stringify(action.payload.data));
```

- When the user logs in, the app saves the login info to `localStorage` so it can be retrieved later (like when the page refreshes).
- When the user logs out (in the `logout` action), the data is removed:

```javascript
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('role');
localStorage.removeItem('data');
```

---

### Why Use `localStorage`?
- It keeps the login state persistent. Without it, if the user refreshes the page, the app would forget they were logged in, and they’d have to log in again.
- By checking `localStorage` in `initialState`, the app can restore the user’s login state when it starts.

---

### Summary
- The code uses `localStorage.getItem()` to read saved values (`isLoggedIn`, `role`, `data`) from the browser.
- It processes these values:
  - `isLoggedIn` becomes a boolean (`true` or `false`).
  - `role` becomes a string (or `""` if none).
  - `data` becomes an object (or `{}` if none) using `JSON.parse()`.
- Defaults (`false`, `""`, `{}`) ensure the app works even if `localStorage` is empty.
- This happens when the app starts to load the user’s login state, so the app knows whether to show a logged-in or logged-out UI.

Let me know if you want more details or examples of how this works in practice!

*/