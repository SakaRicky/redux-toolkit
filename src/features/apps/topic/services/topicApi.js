// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://jsonplaceholder.typicode.com',
    baseUrl: 'http://localhost:8080/api',
  }),
  endpoints: (builder) => ({
    getTopics: builder.mutation({
      query: () => ({
        url: '/topics/actions/read.php',
        method: 'GET',
      }),
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

export const { useGetTopicsMutation, usePutAddTopicsMutation } = topicApi;
