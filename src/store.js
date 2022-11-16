import { configureStore } from '@reduxjs/toolkit'
import topicReducer from './features/apps/topic/slices';
import categoryReducer from './features/categories/categorySlice';

const reducer = {
  topics: topicReducer,
  categories: categoryReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;