import { SerializedError, createSlice } from "@reduxjs/toolkit"
import { fetchUserRegister } from "./ActionCreators"


interface IAuthState {
    user: string,
    error: SerializedError | null
}

const initialState: IAuthState = {
    user: JSON.parse(localStorage.getItem('user') || ''),
    error: null
}

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserRegister.fulfilled, (state, action) => {

//             })
//     },
// })