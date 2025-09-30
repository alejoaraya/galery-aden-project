import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchPhotosAsync,
    filterFavoritePhoto,
    filterPhoto,
    setImages,
    toggleFavorite,
} from '../store/reducers/photoReducer';

export function usePhoto() {
    const { data, filtered, error, status, showFavorite } = useAppSelector(state => state.photos);
    const dispatch = useAppDispatch();

    const fetchPhoto = () => {
        const images = JSON.parse(localStorage.getItem('images') || 'null');

        if (images && images.length > 0) {
            dispatch(setImages(images))
        } else {
            dispatch(fetchPhotosAsync());
        }

    }

    const handleFilterPhoto = (value: string) => {
        dispatch(filterPhoto(value));
    }

    const handleFavorite = (id: number) => {
        dispatch(toggleFavorite(id));
    }

    const handleFavoriteFilterPhoto = () => {
        dispatch(filterFavoritePhoto())
    }

    return {
        data,
        status,
        favoriteTotal: data.filter(video => video.favorited).length,
        filtered,
        error,
        showFavorite,
        fetchPhoto,
        handleFilterPhoto,
        handleFavorite,
        handleFavoriteFilterPhoto
    };
}