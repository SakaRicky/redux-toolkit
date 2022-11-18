import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }), //https://localhost:8080/api/topics/actions/read.php
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => "all",
    }),
    getCountryByFullName: builder.query({
      query: (name) => `name/${encodeURI(name)}?fullText=true`,
    }),
  }),
});

export const { useGetAllCountriesQuery, useGetCountryByFullNameQuery } =
  countriesApi;