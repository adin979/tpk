import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Header(){
    const {isAuthenticated,logout} = useAuth()
    const navigate = useNavigate()

    const login =()=>navigate('/login')

    return(
        <div className="d_flex pos_sti jc_sb t_0 z_50E bb_1SsolidSHe2e8f0 ai_ct jc_sb bg_Hdddddd h_fit grid-area_navbar">
            <div className="d_flex ai_ct gap_8  "><img src="favicon.svg" className="w_30 h_30 " alt="logo vite" /></div>
            {isAuthenticated?
            <button className='bg_Hfee2e2E cl_Hdc2626E bd_nn brd_6 fs_12 fw_600E cursor_pointer ' onClick={logout}>Logout</button>:
            <button className='bg_Hfee2e2E cl_Hdc2626E bd_nn brd_6 fs_12 fw_600E cursor_pointer' onClick={login}>Login</button>}
        </div>
    )
}
export default Header