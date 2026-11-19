import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom"
function SideBar({...props}){
    const [minim,setMinim]=useState(false)
    const [open,setOpen]=useState<boolean>(false)
    const location=useLocation()

    useEffect(()=>{
        const close=()=>setOpen(false)
        close()
    },[location.pathname])
    return(
        <aside {...props} className={`
         Mpos_rel Spos_fix 
        h_100 z_99E 
        tst_trfS0D3sSease-in-out grid-area_sidebar
        Sh_100vh  bg_rgbaF110K110K130K0D5E
        ${minim?'w_20px':'w_230px'}
        ${!open?'Strf_trsxF-100':'w_100vw h_100vh'}
        `} onClick={()=>setOpen(!open)}>
            <button className={`Md_nn pos_fix m_3pxS14px z_100E Sh_50px Sd_grid ai_ct ${!open?'l_100':''}`} onClick={()=>setOpen(!open)}>
                <span className="d_block w_40px h_4px bg_grey"></span>
                <span className="d_block w_40px h_4px bg_grey"></span>
                <span className="d_block w_40px h_4px bg_grey"></span>
            </button>
            <div className={`
            ${!open?'Strf_trsxF-100':''}
            ${minim?'trf_trsxF-200px':''}
            Sbg_grey
            w_230px pos_fix d_flex fd_col gap_12px p_50pxS0 ai_ct flex_100`}>
                <div><h3>MENU</h3></div>
                <Navbar/>
                <div className="w_100 ta_end">
                    <span className="bg_rgbaF0K0K0K0E bd_nn p_0 pos_fix cur_poin d_contents " onClick={()=>setMinim(!minim)}>{'<<'}</span>
                </div>
            </div>
        </aside>
    )
}
export default SideBar