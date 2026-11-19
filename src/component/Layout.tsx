import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";
function Layout() {
    const [open,setOpen]=useState<boolean>(false)
    return (
        <div id='wrapper'>
            <button className={`Md_nn pos_fix ops_0E z_100E h_30`} onClick={()=>setOpen(!open)}>Menu</button>
            <SideBar open={open}/>
            <Header/>
            <main className="grid-area_main minh_120vh">
                <Outlet/>
            </main>
        </div>
    );
}

export default Layout;