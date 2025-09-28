import type { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action);

    if (action.type.startsWith('videos/toggleFavorite')) {
        const state = store.getState();
        localStorage.setItem('images', JSON.stringify(state.videos.data));
    }

    return result;
};