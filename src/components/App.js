import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:9090",
});

// Request Interceptor: Attach access token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically refresh token if expired
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Access token expired. Trying to refresh...");

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.log("No refresh token available. Redirecting to login.");
          window.location.href = "/login"; // Redirect to login if refresh token is missing
          return Promise.reject(error);
        }

        // Request a new access token using refresh token
        console.log("Requesting new access token..."+refreshToken);
        const refreshResponse = await axios.post(
          "http://localhost:9090/auth/refreshToken",
          { token: refreshToken }
        );

        // Update new access token in local storage
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired. Redirecting to login.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect user to login page
      }
    }

    return Promise.reject(error);
  }
);

export default API;
