import { IBook } from "../../models/IBook";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserRegister } from "../../models/IUserRegister";

// Теперь при помощи Redux toolkit. Это специальная настройка, которая делает все за нас, 
// т.е. без dispatch'ей.
export const fetchBooks = createAsyncThunk('book/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get<IBook[]>('https://localhost:7250/book/get')
        return response.data;   
    } catch (error: any) {
        return error.message;
    }
})

export const fetchUserAuth = createAsyncThunk('user/auth', 
        async (user: IUserRegister) => {
    try {
        const response = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'https://localhost:7250/Auth/register',
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })
        return response.data;
    } catch (error: any) {
        return error.message;
    }
})

// export const fetchBooks = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(bookSlice.actions.booksFetching());
//         const response = await axios.get<IBook[]>('https://localhost:7250/books')
//         dispatch(bookSlice.actions.booksFetchingSuccess(response.data));
//     } catch (error: any) {
//         dispatch(bookSlice.actions.booksFetchingError(error.message))
//     }
// }