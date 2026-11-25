import { useAuth } from "../context/AuthContext"

function Header(){
    const {logout} = useAuth()


    return(
        <header className=" pos_sti bg_rgba:255~255~255~085E bb_1px_solid_var:border-color t_0 grid-area_navbar">
            <div className="d_flex ai_ct jc_sb h_4rem">
                <div className="Sm_0_4rem"><img src="favicon.svg" className="w_50px h_30px Sm_12pxS70px" alt="logo vite" /></div>
                <button className='d_inline-flex gap_0.5rem px fs_0D75rem lh_1rem p_0D5rem_0D875rem cl_var:cl-rose bc_var:bd-rose bg_var:bg-rose brd_0D75rem fw_600E m_0S14px cursor_pointer ai_ct' onClick={logout}>
                    <svg className="w_1rem h_1rem" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </header>
    )
}
export default Header