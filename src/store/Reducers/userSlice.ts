// дополнительная обертка над reducer'ами, которая добавляет дополнительный функционал и упрощает работу.

import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { fetchUserAuth } from "./ActionCreators"
import { IUserResponse } from "../../models/IUserResponse"


interface UserStateResponse {
    userResponse: IUserResponse | null,
    isLoading: boolean,
    error: SerializedError | null
}

// начальное состояние 
const initialState: UserStateResponse = {
    userResponse: null,
    isLoading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userResponse = action.payload;
            })
            .addCase(fetchUserAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    }
})

export default userSlice.reducer;