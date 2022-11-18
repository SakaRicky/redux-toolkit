// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://jsonplaceholder.typicode.com',
    baseUrl: 'http://localhost:8080/api/topics',
  }),
  endpoints: (builder) => ({
    getTopics: builder.mutation({
      query: () => ({
        url: '/actions/read.php',
        method: 'GET',
      }),
    }),
    getTopicsByCategoryId2: builder.query({
      query: (category_id) => ({
        url:`/actions/read.php?${category_id}`,
        method: 'GET',
      }),
    }),
    getTopicsByCategoryId: builder.query({
      query: (arg) => {
        const { category_id } = arg;
        console.log('arg: ', arg);
        return {
          url: '/actions/read.php',
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

export const { useGetTopicsMutation, useGetTopicsByCategoryIdQuery, usePutAddTopicsMutation } = topicApi;
