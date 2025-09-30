import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './reducers/photoReducer';
import { localStorageMiddleware } from './middleware/localStorageMiddeleware';

export const store = configureStore({
    reducer: {
        photos: photoReducer,
    },
    middleware: (getDefault) => getDefault().concat(localStorageMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
