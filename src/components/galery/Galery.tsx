import { useEffect } from "react"
import { usePhoto } from "../../hooks/useVideo"
import { Card } from "./Card"
import { FavoriteToggle, Skeleton } from "../ui"

export const Galery = () => {

    const { error, status, favoriteTotal, filtered, showFavorite, handleFavorite, fetchPhoto, handleFavoriteFilterPhoto } = usePhoto()

    useEffect(() => {
        fetchPhoto()
    }, [])



    const handleClickFavoriteToggle = () => {
        handleFavoriteFilterPhoto()
    }

    if (status === 'failed') {
        return (
            <div className="my-5 flex flex-wrap gap-10 "><h1>{error}</h1></div>)
    }

    return (
        <div className="my-5 flex flex-col gap-10 justify-center items-center">
            {
                favoriteTotal > 0 && <FavoriteToggle favoriteTotal={favoriteTotal} handleClickFavoriteToggle={handleClickFavoriteToggle} showFavorite={showFavorite} />
            }
            <div className="flex flex-wrap gap-10 mt-5 justify-center ">

                {
                    status === 'loading'
                        ? <Skeleton />
                        : filtered.length < 1
                            ? <h1 className="mt-5 font-bold text-center">No se encontraron imágenes del autor ingresado</h1>
                            : filtered.map(photo => (<Card key={photo.id} handleFavorite={handleFavorite} {...photo} />))
                }
            </div>
        </div>
    )
}