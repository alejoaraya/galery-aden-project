import { Filter, Galery } from "../components/galery"
import { Navbar } from "../components/ui/Navbar"
import { Layout } from "../layout/Layout"

export const GaleryPage = () => {
    return (
        <>
            <Navbar />
            <Layout>
                <Filter />
                <Galery />
            </Layout>
        </>
    )
}
