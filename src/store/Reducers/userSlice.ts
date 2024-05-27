// дополнительная обертка над reducer'ами, которая добавляет дополнительный функционал и упрощает работу.

import { createSlice } from "@reduxjs/toolkit"
import { fetchUserRegister } from "./ActionCreators"
import { IUserResponse } from "../../models/IUserResponse"

// интерфейс для ответа
interface UserStateResponse {
    userResponse: IUserResponse | null,
    isLoading: boolean,
    error: string | null
}

// начальное состояние 
const initialState: UserStateResponse = {
    userResponse: null,
    isLoading: false,
    error: null
}

// проработка всех состояний, а именно успешно, с ошибкой и загрузка
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.userResponse = null;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem("Authorization");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                console.log("USerSlice: " + action.payload);
                state.userResponse = action.payload;
                console.log("UserSlice-userResponse: " + state.userResponse);
            })
            .addCase(fetchUserRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserRegister.rejected, (state, action) => {
                state.isLoading = false;
                console.log("UserSlice-Error: " + action.error.message);
                if (action.error.message === undefined){
                    state.error = null;
                } else {
                    state.error = action.error.message;
                }
            })
    }
})

export default userSlice.reducer;

export const {logout} = userSlice.actions;