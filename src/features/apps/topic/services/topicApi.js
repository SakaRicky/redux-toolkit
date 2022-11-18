// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://jsonplaceholder.typicode.com',
    baseUrl: 'http://localhost:8080/api/topics/actions',
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTopics: builder.mutation({
      query: () => ({
        url: '/read.php',
        method: 'GET',
      }),
    }),
    topics: builder.query({
      query: () => "/read.php"
    }),
    getTopicById: builder.query({
      query: (arg) => {
        const { id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/single_read.php',
          params: { id },
          method: 'GET',
        };
      },
    }),
    addTopic: builder.mutation({
      query: (topic) => ({
        url: "/create.php",
        method: "POST",
        body: topic
      }),
      invalidatesTags: ["Task"]
    }),
    updateTopic: builder.mutation({    // <-- attention here
      query: ({ id, ...rest }) => {
        console.log(123, id, rest);
        return {
          url: `/update.php?id=${id}`,
          method: "POST",
          body: rest
        };
      }
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/delete.php?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Topic"]
    }),
    getTopicsByCategoryId: builder.query({
      query: (arg) => {
        const { category_id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/read.php',
          params: { category_id },
          method: 'GET',
        };
      },
    }),
    putAddTopics: builder.mutation({
      query: (body) => ({
        url: '/todos/1',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useTopicsQuery, useGetTopicsMutation, useGetTopicByIdQuery, useAddTopicMutation, useUpdateTopicMutation, useDeleteTopicMutation, useGetTopicsByCategoryIdQuery, usePutAddTopicsMutation } = topicApi;
