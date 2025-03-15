import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const virtualLibraryApi = createApi({
  reducerPath: "virtualLibraryApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44347/api" }),
  tagTypes: ["StudyRooms"],

  endpoints: (builder) => ({

    //StudRoom
    addStudyRoom: builder.mutation({
      query: (newRoom) => ({
        url: "/studyroom",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: ["StudyRooms"],
    }),
    getStudyRooms: builder.query({
      query: () => "/studyroom",
      providesTags: ["StudyRooms"],
    }),
    updateStudyRoom: builder.mutation({
      query: ({ id, updatedRoom }) => ({
        url: `/studyroom/${id}`,
        method: "PUT",
        body: updatedRoom,
      }),
      invalidatesTags: ["StudyRooms"],
    }),
    deleteStudyRoom: builder.mutation({
      query: (id) => ({
        url: `/studyroom/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudyRooms"],
    }),
  }),
});

export const {
  useGetStudyRoomsQuery,
  useAddStudyRoomMutation,
  useUpdateStudyRoomMutation,
  useDeleteStudyRoomMutation,
} = pokemonApi;
