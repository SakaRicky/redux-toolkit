import { configureStore } from '@reduxjs/toolkit'
import topicReducer from './features/apps/topic/slices';

const reducer = {
  topics: topicReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;