import { useState } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import { useVideo } from "../../hooks/useVideo"




export const Filter = () => {

    const [value, setValue] = useState('')
    const { handleFilterVideo } = useVideo()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmit = () => {
        handleFilterVideo(value)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit()
        }
    }

    return (
        <div className="flex gap-2 w-full max-w-sm">
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input value={value} onChange={onChange} onKeyDown={onKeyDown} type="search" placeholder="Ingresar nombre de autor" />
            </label>
            <button onClick={onSubmit} className="btn btn-primary">Enviar</button>
        </div>
    )
}