
import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './reducers/videoReducer';
import { localStorageMiddleware } from './middleware/localStorageMiddeleware';

export const store = configureStore({
    reducer: {
        videos: videosReducer,
    },
    middleware: (getDefault) => getDefault().concat(localStorageMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
