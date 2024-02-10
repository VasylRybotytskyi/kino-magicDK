import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_TMDB_KEY;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (params) => ({
        url: `/discover/movie?api_key=${apiKey}`,
        method: "GET",
        params,
      }),
    }),
    getPopularMovies: builder.query({
      query: () => `/movie/popular?api_key=${apiKey}&language=uk`,
    }),
    getUpcommingMovies: builder.query({
      query: () => `/movie/upcoming?api_key=${apiKey}&language=uk`,
    }),
    getTrendingMovies: builder.query({
      query: () => `/trending/movie/day?api_key=${apiKey}&language=uk`,
    }),

    getMovieById: builder.query({
      query: (movieId) =>
        `/movie/${movieId}?api_key=${apiKey}&append_to_response=credits&language=uk`,
    }),
    getVideoById: builder.query({
      query: (movieId) =>
        `/movie/${movieId}/videos?api_key=${apiKey}&language=uk`,
    }),
    getMovieByName: builder.query({
      query: (query) =>
        `/search/movie?query=${query}&api_key=${apiKey}&language=uk&page=1`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetPopularMoviesQuery,
  useGetUpcommingMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetMovieByIdQuery,
  useGetVideoByIdQuery,
  useGetMovieByNameQuery,
} = movieApi;
