import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Redux/Slices/AuthSlice.js"
import courseSliceReducer  from "../Redux/Slices/CourseSlice.js"
import razorPaySlicereducer from "../Redux/Slices/RazorpaySlice.js"
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:razorPaySlicereducer
    },
    devTools:true
});

export default store;

/*
Let’s break down each line of the provided Redux Toolkit store configuration code in very simple words. This code sets up the Redux store, which is like a central place where the app keeps all its state (data, like whether a user is logged in).

---

```javascript
import { configureStore } from "@reduxjs/toolkit";
```
- This line brings in a tool called `configureStore` from the Redux Toolkit library.
- `configureStore` helps create the Redux store, which is like a box that holds all the app’s state and rules for updating it.

---

```javascript
import authSliceReducer from "../Redux/Slices/AuthSlice.js";
```
- This line brings in the `authSliceReducer` from a file called `AuthSlice.js`, located in the `../Redux/Slices/` folder.
- The `authSliceReducer` is the set of rules (from your previous `authSlice`) that controls the authentication state (like `isLoggedIn`, `role`, and `data`).
- It’s like importing the instructions for how to manage login/logout data.

---

```javascript
const store = configureStore({
```
- This creates the Redux store and names it `store`.
- `configureStore` is a function that sets up the store, and we pass it an object `{}` with settings inside the parentheses.
- Think of this as building the box to hold the app’s state and giving it rules to follow.

---

```javascript
    reducer: {
```
- This starts the section where we tell the store which rules (reducers) to use to manage the state.
- A reducer is like a set of instructions that says how the state can change (e.g., what happens when a user logs in).

---

```javascript
        auth: authSliceReducer
```
- This says, “For the `auth` part of the state, use the `authSliceReducer`.”
- The `auth` key is the name of this section of the state (like a label for login-related data).
- `authSliceReducer` (from `AuthSlice.js`) contains the rules for handling `isLoggedIn`, `role`, and `data`.
- It’s like saying, “The login/logout part of the app is controlled by these rules.”

---

```javascript
    },
```
- This closes the `reducer` section.

---

```javascript
    devTools: true
```
- This turns on Redux DevTools, a browser extension that helps developers see and debug the app’s state.
- Setting `devTools: true` means you can use this tool to check what’s in the store, see how it changes, and troubleshoot problems.
- It’s like adding a window to the store so you can peek inside while developing.

---

```javascript
});
```
- This closes the `configureStore` setup and finishes creating the store.

---

```javascript
export default store;
```
- This makes the `store` available to other parts of the app.
- By exporting it, other files (like React components) can import and use the store to access or update the state.
- It’s like sharing the box of state so the whole app can use it.

---

### What This Code Does
- This code creates a Redux store, which is the central place to keep and manage the app’s state.
- It tells the store to use the `authSliceReducer` to handle the `auth` part of the state (login/logout data).
- It enables Redux DevTools for debugging.
- It shares the store so other parts of the app can use it to read or update the state (e.g., to check if a user is logged in or to log them out).

---

### How It Connects to the `authSlice`
- The `authSliceReducer` (imported from `AuthSlice.js`) is the reducer you created in the earlier code (the one with `login` and `logout` actions).
- By adding it to the store under `reducer: { auth: authSliceReducer }`, the store knows to use those rules for the `auth` part of the state.
- For example:
  - When the app calls `dispatch(login({ role: "admin", data: { name: "John" } }))`, the `authSliceReducer` updates the `auth` state in the store.
  - The store then holds the updated state (e.g., `isLoggedIn: true`, `role: "admin"`) and makes it available to the app.

---

### Example of How the Store Is Used
- In a React app, you’d wrap your app with a `Provider` to connect the store to your components:
  ```javascript
  import { Provider } from "react-redux";
  import store from "./store.js"; // This file
  import App from "./App";

  function Main() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
  ```
- Components can then use Redux hooks (like `useSelector` to read the state or `useDispatch` to trigger actions) to interact with the `auth` state.

---

### Summary
- This code sets up the Redux store, which holds the app’s state.
- It uses the `authSliceReducer` to manage the `auth` state (login/logout info).
- It enables debugging with DevTools.
- It shares the store so the app can use it to check or update the state (e.g., to show a "Logout" button for logged-in users).

Let me know if you want more details, like how to use the store in a React component or how it works with the `authSlice` actions!
*/