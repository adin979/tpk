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
        tst_trf_0D3s_ease-in-out grid-area_sidebar
        Sh_85vh  bg_var-bg-surface
        bd_1px_solid
        bc_var-border-color
        ${minim?'w_20px':'w_230px'}
        ${!open?'Strf_trsx--100':''}
        `} onClick={()=>setOpen(!open)}>
            <button className={`Md_nn d_flex fd_col jc_se h_40px pos_fix bg_rgba-0__0__0__0E 
                bd_1px_solid bc_var-border-color m_D4rem_D75rem 
                z_100E ai_ct ${!open?'l_100':'Strf_trsx-300 bd_nn'}`} onClick={()=>setOpen(!open)}>
                <span className={`d_block tst_var-transit w_40px h_2px bg_var-text-muted ${open?'trf_rotate--32deg trfo_98':''}`}></span>
                <span className={`d_block tst_var-transit w_40px h_2px bg_var-text-muted ${open?'ops_0E':''}`}></span>    
                <span className={`d_block tst_var-transit w_40px h_2px bg_var-text-muted ${open?'trf_rotate-31deg trfo_98':''}`}></span>
            </button>
            <div className={`p_0_1D25rem bd_1px_solid_var-border-color h_4rem d_flex ai_ct jc_ct pos_fix 
            ${minim?'Mops_0E':''}
                `}>
                MENU UTAMA
            </div>
            <div className={`
            tst_var-transit
            ${!open?'Strf_trs--100':''}
            ${minim?'trf_trsx--200px':''}
            w_230px pos_fix d_flex fd_col gap_12px p_50px_0 ai_ct flex_100`}>
                <div><h3>MENU</h3></div>
                <Navbar/>
                <div className="w_100 ta_end Sd_nn">
                    <span className="bg_rgba-0K0K0K0E Sd_nn p_0 pos_fix cur_poin d_contents " onClick={()=>setMinim(!minim)}>{'<<'}</span>
                </div>
            </div>
        </aside>
    )
}
export default SideBar