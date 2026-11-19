import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Header(){
    const {isAuthenticated,logout} = useAuth()
    const navigate = useNavigate()

    const login =()=>navigate('/login')

    return(
        <div className="d_flex pos_sti jc_sb t_0 z_50E bb_1pxSsolidSHe2e8f0 ai_ct jc_sb bg_Hdddddd h_fit grid-area_navbar">
            <div className=""><img src="favicon.svg" className="w_50px h_30px Sm_12pxS70px" alt="logo vite" /></div>
            {isAuthenticated?
            <button className='bg_Hfee2e2E cl_Hdc2626E bd_nn px fs_12px fw_600E m_0S14px cursor_pointer ' onClick={logout}>Logout</button>:
            <button className='bg_Hfee2e2E cl_Hdc2626E bd_nn px fs_12px fw_600E m_0S14px cursor_pointer' onClick={login}>Login</button>}
        </div>
    )
}
export default Header