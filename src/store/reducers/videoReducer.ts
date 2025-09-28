import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Video, VideoResponse } from '../../__types__/videos';
import axios from 'axios';


interface VideosState {
    data: Video[];
    filtered: Video[];
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

export const fetchVideosAsync = createAsyncThunk<Video[]>(
    'videos/fetchVideos',
    async (): Promise<Video[]> => {
        try {
            const response = await axios.get<VideoResponse>('https://api.pexels.com/videos/popular', {
                headers: {
                    Authorization: import.meta.env.VITE_PEXELS_API_KEY
                }
            });

            return response.data.videos.map(video => ({
                id: video.id,
                user: {
                    name: video.user.name,
                    url: video.user.url
                },
                url: video.image,
                desc: video.user.name,
                favorited: false
            }));
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al obtener los videos: ' + error.message)
            }
            throw new Error('Error desconocido al obtener los videos')
        }
    }
);



const videosReducer = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        filterVideos(state, action: PayloadAction<string>) {
            if (state.showFavorite) {
                state.filtered = state.data.filter(video => video.favorited && video.user.name.toLocaleLowerCase().includes(action.payload.toLowerCase()))
                state.input = action.payload
            } else {
                state.filtered = state.data.filter(video => video.user.name.toLocaleLowerCase().includes(action.payload.toLowerCase()))
                state.input = action.payload
            }
        },
        filterFavoriteVideos(state) {
            state.showFavorite = !state.showFavorite;

            state.filtered = state.data.filter(video => {
                const matchesSearch = video.user.name
                    .toLowerCase()
                    .includes(state.input.toLowerCase());

                const matchesFavorite = !state.showFavorite || video.favorited;

                return matchesSearch && matchesFavorite;
            })
        },
        toggleFavorite(state, action: PayloadAction<number>) {
            state.data = state.data.map(video => video.id === action.payload ? { ...video, favorited: !video.favorited } : video)
            state.filtered = state.filtered.map(video => video.id === action.payload ? { ...video, favorited: !video.favorited } : video)
            const totalFavorited = state.data.filter(video => video.favorited).length;
            if (totalFavorited === 0) {
                state.showFavorite = false;
                state.filtered = state.data
            }
        },
        setImages(state, action: PayloadAction<Video[]>) {
            state.data = action.payload;
            state.filtered = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideosAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideosAsync.fulfilled, (state, action: PayloadAction<Video[]>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.filtered = action.payload;
            })
            .addCase(fetchVideosAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Error desconocido';
            });
    },
});

export const { filterVideos, toggleFavorite, setImages, filterFavoriteVideos } = videosReducer.actions
export default videosReducer.reducer;
