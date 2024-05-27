import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../models/IBook";
import { fetchBooks } from "./ActionCreators";

interface BookState {
    books: IBook[],
    booksOriginal: IBook[],
    isLoading: boolean,
    error: SerializedError | null;
}

const initialState: BookState = {
    books: [],
    booksOriginal: [],
    isLoading: false,
    error: null
} 

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
                state.booksOriginal = action.payload;
            })
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error; 
            })
    }
})

export default bookSlice.reducer;