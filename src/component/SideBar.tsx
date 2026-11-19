import { useState } from "react"
import Navbar from "./Navbar"
function SideBar({...props}){
    const open=props.open
    const [minim,setMinim]=useState(false)

    return(
        <aside {...props} className={`
        bg_He4e4e7E Mpos_rel Spos_fix 
        h_100P z_99E 
        tst_trfS0D3sSease-in-out grid-area_sidebar
        bd_1Ssolid
        Sh_100vh
        ${!open?'Strf_trsxF-100P':''}
        ${minim?'w_20':'w_230'}
        `}>
            <div className={`${minim?'ops_0E':'ops_1E'} pos_fix d_flex fd_col gap_12 p_50`}>
                <div><h3>Logo Aplikasi</h3></div>
                <Navbar/>
            </div>
            <button className="Sd_nn bg_rgbaF0K0K0K0E bd_nn p_0 pos_fix b_0" onClick={()=>setMinim(!minim)}>{'<<'}</button>
        </aside>
    )
}
export default SideBar