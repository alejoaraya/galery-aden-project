

type Props = {
    children?: React.ReactNode
}

export const Layout = ({ children }: Props) => {
    return (
        <div className="my-5 mx-5 md:mx-10 lg:mx-20 xl:mx-40 flex flex-col justify-center items-center ">{children}</div>
    )
}