import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/config";
import { toastError, toastSuceess } from "../../util/reactToastify";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({
    filterAuthors = [],
    filterCourses = [],
    filterSemesters = [],
    orderFilter = "",
    searchFilter = "",
  }) => {
    //   const { data } = await axiosInstance.get("/api/BookApi");
    //   return data.data;
    //   try {
    //     const { data } = await axiosInstance.get(`/api/BookApi`);
    //     return data.data;
    //   } catch (error) {
    //     console.log(error.response.data.message);
    //     toastError(error?.response?.data?.message);
    //   }
    try {
      const response = await axios.get(
        "https://api.asianpublisher.in/api/BookApi",
        {
          headers: {
            Author: filterAuthors,
            Course: filterCourses,
            Semester: filterSemesters,
            orderFilter: orderFilter,
            search: searchFilter,
          },
        }
      );
      // console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
);

export const fetchBookDetails = createAsyncThunk(
  "book/fetchBookDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `https://api.asianpublisher.in/api/BookApi/${id}`
      );
      // console.log("response", response);
      return response.data;
    } catch (error) {
      toastError(error?.response?.data?.message);
      console.log(error.response.data.message);
    }
  }
);

export const createBook = createAsyncThunk(
  "book/createBook",
  async (bookData) => {
    try {
      const { data } = await axiosInstance.post("/api/book", bookData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (data?.success) {
        toastSuceess(data?.message);
      }
      return data;
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (updatedBook) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/book/${updatedBook.id}`,
        updatedBook.bookData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data?.success) {
        toastSuceess(data?.message);
      }

      return data.data;
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (bookId) => {
    try {
      const { data } = await axiosInstance.delete(`/api/book/${bookId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (data?.success) {
        toastSuceess(data?.message);
      }

      return bookId;
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: "idle",
    error: null,
    message: "",
    bookDetails: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get  all Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })

      //Get book Details

      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.bookDetails = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })

      //Create books

      .addCase(createBook.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.books.push(action?.payload?.data);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })

      //Update books

      .addCase(updateBook.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book._id === action?.payload?._id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state) => {
        state.loading = "rejected";
      })

      //Delete books
      .addCase(deleteBook.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.books = state.books.filter(
          (book) => book?._id !== action.payload
        );
      })
      .addCase(deleteBook.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default bookSlice.reducer;
