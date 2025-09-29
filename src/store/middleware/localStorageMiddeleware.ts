import type { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = store => next => action => {
    const result = next(action);

    if (action.type.startsWith('photos/toggleFavorite')) {
        const state = store.getState();
        localStorage.setItem('images', JSON.stringify(state.photos.data));
    }

    return result;
};