import type { Video } from "../../__types__/videos"

interface Props extends Video {
    handleFavorite: (id: number) => void
}

export const Card = ({ desc, url, user, favorited, id, handleFavorite }: Props) => {


    return (
        <div className="card bg-base-100 w-full h-full  max-w-96 shadow-sm ">
            <figure>
                <img
                    src={url} alt={desc} />
            </figure>
            <div className="card-body items">
                <a className="text-lg font-bold underline" href={user.url} target="_blanck">{user.name}</a>
                <p >{desc}</p>
                <button className="btn" onClick={() => handleFavorite(id)}>
                    Me gusta
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`size-[1.2em] transition-all duration-400 ease-in ${favorited ? ' scale-105 stroke-red-500 fill-red-500' : ''} `}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                </button>
            </div>

        </div>
    )
}

