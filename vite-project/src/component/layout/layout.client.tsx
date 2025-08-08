import { Outlet } from "react-router-dom"
import Header from "./client/header"
import Footer from "./client/footer"

const LayoutClient = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LayoutClient