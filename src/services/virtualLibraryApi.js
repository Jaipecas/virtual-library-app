import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "virtualLibraryApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44347/api" }),

  endpoints: (build) => ({
    addStudyRoom: build.mutation({
      query: (newRoom) => ({
        url: "/studyRoom",
        method: "POST",
        body: newRoom,
      }),
    }),
  }),
});

export const { useAddStudyRoomMutation } = pokemonApi;
