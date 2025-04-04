// searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../components/App';

// API endpoint
const apiEndpoint = "http://localhost:9090/products";

// Async thunk for fetching search results
// export const fetchSearchResults = createAsyncThunk(
//   'search/fetchResults',
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(apiEndpoint, {
//         params: { query: searchTerm },
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

// Async thunk for fetching search results
export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (searchText) => {
    try {
      // Make an API call using the search text
      const response = await API.get(`/products/name/${searchText}`, {
        withCredentials: true, // Add credentials if required
      });

      // Extract the product ID from the response and handle redirection logic
      const productId = response.data.id;
      if (productId > 0) {
        return { productId, data: response.data }; // Return the data for use in reducers
      } else {
        throw new Error("Item not found!");
      }
    } catch (error) {
      // Handle errors and pass them to the rejected state
      throw new Error(error.response ? error.response.data : "An error occurred while searching.");
    }
  }
);


// Slice for handling search state
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: null, // Store search results
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.results = action.payload; // Store productId and data
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch search results";
      });
  },
});

// Export actions and reducer
export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
