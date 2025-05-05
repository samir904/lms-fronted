import axios from "axios";

const BASE_URL="http://localhost:5014/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;

/*
Let’s break down each line of the provided code in very simple words. This code sets up an `axios` instance, which is a tool used to make HTTP requests (like sending or getting data from a server) in a JavaScript app.

---

```javascript
import axios from "axios";
```
- This line brings in the `axios` library, a popular tool for making HTTP requests (like asking a server for data or sending data to a server).
- It’s like getting a phone to call the server and talk to it.

---

```javascript
const BASE_URL = "http://localhost:5014/api/v1";
```
- This creates a constant (a value that won’t change) called `BASE_URL` and sets it to `"http://localhost:5014/api/v1"`.
- `BASE_URL` is the main address of the server your app will talk to.
- `http://localhost:5014` means the server is running on your own computer (localhost) at port `5014`.
- `/api/v1` is the specific path for the API (the part of the server that handles requests).
- It’s like writing down the server’s address so you can reuse it.

---

```javascript
const axiosInstance = axios.create();
```
- This creates a new `axios` instance called `axiosInstance`.
- An instance is like a customized version of `axios` that you can set up with specific settings (like the server address or other options).
- `axios.create()` makes a blank instance that you can configure.
- It’s like setting up your phone with specific settings for calling the server.

---

```javascript
axiosInstance.defaults.baseURL = BASE_URL;
```
- This sets the default server address for `axiosInstance` to the `BASE_URL` we defined earlier (`http://localhost:5014/api/v1`).
- Now, when you use `axiosInstance` to make requests, you don’t need to write the full server address every time—just the specific path (e.g., `/users` instead of `http://localhost:5014/api/v1/users`).
- It’s like telling your phone, “Always call this server address unless I say otherwise.”

---

```javascript
axiosInstance.defaults.withCredentials = true;
```
- This tells `axiosInstance` to include credentials (like cookies or authentication tokens) when making requests to the server.
- Credentials are like ID cards that prove who the user is (e.g., if they’re logged in).
- Setting `withCredentials: true` means the browser will send cookies or other authentication info with every request, and the server can send them back.
- It’s like telling your phone, “Always send my ID card when calling the server.”

---

```javascript
export default axiosInstance;
```
- This makes `axiosInstance` available to other parts of the app.
- By exporting it, other files (like React components or API helper files) can import and use `axiosInstance` to make requests to the server.
- It’s like sharing your customized phone so other parts of the app can use it to call the server.

---

### What This Code Does
- This code creates a customized version of `axios` (called `axiosInstance`) for making HTTP requests to a server.
- It sets the server’s base address (`http://localhost:5014/api/v1`) so you don’t need to repeat it in every request.
- It ensures credentials (like cookies) are sent with requests, which is important for features like user login.
- It shares the `axiosInstance` so the rest of the app can use it to talk to the server (e.g., to log in a user or fetch data).

---

### How It Connects to the `authSlice`
- The `axiosInstance` is likely used in your app to make API calls, such as logging in or out, which would then trigger the `login` or `logout` actions in your `authSlice`.
- For example:
  - When a user submits a login form, the app might use `axiosInstance` to send their email and password to the server:
    ```javascript
    axiosInstance.post("/login", { email: "john@example.com", password: "123" })
      .then((response) => {
        // If login is successful, dispatch the login action
        dispatch(login({
          role: response.data.role,
          data: response.data.user
        }));
      });
    ```
  - The `baseURL` (`http://localhost:5014/api/v1`) is automatically added, so `/login` becomes `http://localhost:5014/api/v1/login`.
  - `withCredentials: true` ensures the server can send back a cookie (e.g., a session token) to keep the user logged in.

---

### Example of Using `axiosInstance`
- In another file, you might import and use `axiosInstance` like this:
  ```javascript
  import axiosInstance from "./axiosInstance.js";

  // Get user data from the server
  axiosInstance.get("/users").then((response) => {
    console.log(response.data); // Prints the user data
  });

  // Log in a user
  axiosInstance.post("/login", { email: "john@example.com", password: "123" })
    .then((response) => {
      console.log("Logged in!", response.data);
    });
  ```
- The `baseURL` is automatically added, and credentials (like cookies) are sent with each request.

---

### Summary
- The code sets up a customized `axios` instance (`axiosInstance`) for making server requests.
- It uses a base URL (`http://localhost:5014/api/v1`) to simplify request paths.
- It includes credentials (like cookies) for authentication.
- It shares `axiosInstance` so the app can use it to talk to the server (e.g., for login or fetching data).

Let me know if you want more details, like how to use `axiosInstance` in a specific API call or how it works with your `authSlice` for login/logout!

*/