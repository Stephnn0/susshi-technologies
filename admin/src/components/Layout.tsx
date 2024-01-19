import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout = () => {
    return (
        <main className="App">
            <Sidebar />
            <div className="content-container">
            <Outlet  />
            </div>
        </main>
    )
}

export default Layout