import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import topicApi from "../services";

const initialState = [];

export const getTopics = createAsyncThunk(
  "topics/get",
  async () => {
    const res = await topicApi.getAll();
    console.log(res.data);
    return res.data;
  }
);

export const createTopic = createAsyncThunk(
  "topics/create",
  async ({ title, description }) => {
    const res = await topicApi.create({ title, description });
    return res.data;
  }
);

export const updateTopic = createAsyncThunk(
  "topics/update",
  async ({ id, data }) => {
    const res = await topicApi.update(id, data);
    return res.data;
  }
);

export const deleteTopic = createAsyncThunk(
  "topics/delete",
  async ({ id }) => {
    await topicApi.remove(id);
    return { id };
  }
);

export const deleteAllTopics = createAsyncThunk(
  "topics/deleteAll",
  async () => {
    const res = await topicApi.removeAll();
    return res.data;
  }
);

export const findTopicsByTitle = createAsyncThunk(
  "topics/findByTitle",
  async ({ title }) => {
    const res = await topicApi.findByTitle(title);
    return res.data;
  }
);

export const filterTopics = createAsyncThunk(
  "topics/filter",
  async ({ category_id }) => {
    // console.log(" Cat ID: " + category_id);
    const res = await topicApi.getAll(category_id);
    // console.log( res.data['topics'] );
    return res.data;
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  extraReducers: {

    [getTopics.fulfilled]: (state, action) => {
      return [...action.payload];
    },

    [createTopic.fulfilled]: (state, action) => {
      state.push(action.payload);
    },

    [updateTopic.fulfilled]: (state, action) => {
      const index = state.findIndex(topic => topic.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },

    [deleteTopic.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },

    [deleteAllTopics.fulfilled]: (state, action) => {
      return [];
    },

    [findTopicsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },

    [filterTopics.fulfilled]: (state, action) => {
      return [ ...action.payload];
    },
    
  },
});

const { reducer } = topicSlice;
export default reducer;