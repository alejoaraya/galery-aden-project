import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { PhotoDTO, PhotoResponse } from '../../__types__/videos';
import axios from 'axios';


interface VideosState {
    data: PhotoDTO[];
    filtered: PhotoDTO[];
    showFavorite: boolean;
    input: string
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: VideosState = {
    data: [],
    filtered: [],
    showFavorite: false,
    input: '',
    status: 'idle',
    error: null,
};

export const fetchPhotosAsync = createAsyncThunk<PhotoDTO[]>(
    'photo/fetchPhoto',
    async (): Promise<PhotoDTO[]> => {
        try {
            const response = await axios.get<PhotoResponse>('https://api.pexels.com/v1/curated', {
                headers: {
                    Authorization: import.meta.env.VITE_PEXELS_API_KEY
                }
            });

            return response.data.photos.map(photo => ({
                id: photo.id,
                user: {
                    name: photo.photographer,
                    url: photo.photographer_url
                },
                url: photo.src.medium,
                desc: photo.alt || 'No tiene descripción',
                favorited: false
            }));
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al obtener las fotos: ' + error.message)
            }
            throw new Error('Error desconocido al obtener las fotos')
        }
    }
);



const photoReducer = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        filterPhoto(state, action: PayloadAction<string>) {
            if (state.showFavorite) {
                state.filtered = state.data.filter(photo => photo.favorited && photo.user.name.toLocaleLowerCase().includes(action.payload.toLowerCase()))
                state.input = action.payload
            } else {
                state.filtered = state.data.filter(photo => photo.user.name.toLocaleLowerCase().includes(action.payload.toLowerCase()))
                state.input = action.payload
            }
        },
        filterFavoritePhoto(state) {
            state.showFavorite = !state.showFavorite;

            state.filtered = state.data.filter(photo => {
                const matchesSearch = photo.user.name
                    .toLowerCase()
                    .includes(state.input.toLowerCase());

                const matchesFavorite = !state.showFavorite || photo.favorited;

                return matchesSearch && matchesFavorite;
            })
        },
        toggleFavorite(state, action: PayloadAction<number>) {
            state.data = state.data.map(photo => photo.id === action.payload ? { ...photo, favorited: !photo.favorited } : photo)
            state.filtered = state.filtered.map(photo => photo.id === action.payload ? { ...photo, favorited: !photo.favorited } : photo)
            const totalFavorited = state.data.filter(photo => photo.favorited).length;
            if (totalFavorited === 0) {
                state.showFavorite = false;
                state.filtered = state.data
            }
        },
        setImages(state, action: PayloadAction<PhotoDTO[]>) {
            state.data = action.payload;
            state.filtered = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotosAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotosAsync.fulfilled, (state, action: PayloadAction<PhotoDTO[]>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.filtered = action.payload;
            })
            .addCase(fetchPhotosAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Error desconocido';
            });
    },
});

export const { filterPhoto, toggleFavorite, setImages, filterFavoritePhoto } = photoReducer.actions
export default photoReducer.reducer;
