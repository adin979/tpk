import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState,useEffect } from "react";
function Layout() {
    const [showScrollTop,setShowScrollTop]=useState<boolean>(false)

    useEffect(()=>{
        const handleScroll=()=>{
            setShowScrollTop(window.scrollY>300);
        }
        handleScroll()
        window.addEventListener('scroll',handleScroll)
        return ()=>{window.removeEventListener('scroll',handleScroll)}
    },[])


    const scrollToTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'})
    }
    return (
        <div id='wrapper'>
            <SideBar />
            <Header/>
            <main className="grid-area_main minh_120vh p_1.25rem_1rem flex_1_1_0">
                <Outlet/>
            </main>
            <div className={`pos_fix b_0 ${showScrollTop?'trf_trsy:-4rem':'trf_trsy:6rem'} tst_var:transit r_0`}>
                <button onClick={scrollToTop} className="bg_var:text-primary bd_1px_solid_var:border-color ops_0.7E brd_0.785rem p_0.3rem_1rem">
                    <svg viewBox="0 0 24 24" height="24px" width="24px" fill="none" strokeWidth='2.4' stroke="#f8fafc"><path d="M11,20V7.82l-5.6,5.6L4,12l8-8l8,8l-1.4,1.42L13,7.82V20H11Z"/></svg>
                </button>
            </div>

        </div>
    );
}

export default Layout;