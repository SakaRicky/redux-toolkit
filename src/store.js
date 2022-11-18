import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";

import categoryReducer from './features/categories/categorySlice';
import topicSlice from './features/apps/topic/slices/topicSlice';
import { topicApi } from './features/apps/topic/services/topicApi';

const reducer = {
  categories: categoryReducer,
  topics: topicSlice,
  [topicApi.reducerPath]: topicApi.reducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(topicApi.middleware)
});

setupListeners(store.dispatch);