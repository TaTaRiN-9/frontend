import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/userSlice';
import bookReducer from './Reducers/bookSlice';

const rootReducer = combineReducers({
    userReducer,
    bookReducer
});

export const setupStore = () => {
    return configureStore({
    reducer: rootReducer
})
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']