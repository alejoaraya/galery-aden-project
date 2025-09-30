import { Filter, Gallery } from "../components/gallery"
import { Navbar } from "../components/ui/Navbar"
import { Layout } from "../layout/Layout"

export const GalleryPage = () => {
    return (
        <>
            <Navbar />
            <Layout>
                <Filter />
                <Gallery />
            </Layout>
        </>
    )
}
