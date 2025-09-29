
interface Props {
    count?: number
}

export const Skeleton = ({ count = 3 }: Props) => {



    return (
        <>
            {
                Array(count).map(i => (
                    <div key={i} className="flex w-full flex-col gap-4">
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ))
            }
        </>
    )
}
