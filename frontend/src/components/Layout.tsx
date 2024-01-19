import { Outlet } from "react-router-dom"
import Navbar2 from "./Navbar/Navbar2"

const Layout = () => {

  return <>
          <Navbar2/>
            <div className="content-wrapper">
                <Outlet/>
                </div>
         </>
}

export default Layout

