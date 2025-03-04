import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/counter/searchSlice'; // Make sure this path is correct
import counterReducer from '../features/counter/counterSlice'
const store = configureStore({
  reducer: {
    search: searchReducer, // Add your reducers here
    counter: counterReducer
  },
});

export default store;