import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
function Layout() {
    return (
        <div id='wrapper'>
            <SideBar />
            <Header/>
            <main className="grid-area_main minh_120vh ">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;