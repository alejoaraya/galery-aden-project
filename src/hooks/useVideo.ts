import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchVideosAsync,
    filterFavoriteVideos,
    filterVideos,
    setImages,
    toggleFavorite,
} from '../store/reducers/videoReducer';

export function useVideo() {
    const { data, filtered, error, status, showFavorite } = useAppSelector(state => state.videos);
    const dispatch = useAppDispatch();

    const fetchVideos = () => {
        const images = JSON.parse(localStorage.getItem('images') || 'null');

        if (images && images.length > 0) {
            dispatch(setImages(images))
        } else {
            dispatch(fetchVideosAsync());
        }

    }

    const handleFilterVideo = (value: string) => {
        dispatch(filterVideos(value));
    }

    const handleFavorite = (id: number) => {
        dispatch(toggleFavorite(id));
    }

    const handleFavoriteFilterVideo = () => {
        dispatch(filterFavoriteVideos())
    }

    return {
        data,
        status,
        favoriteTotal: data.filter(video => video.favorited).length,
        filtered,
        error,
        showFavorite,
        fetchVideos,
        handleFilterVideo,
        handleFavorite,
        handleFavoriteFilterVideo
    };
}