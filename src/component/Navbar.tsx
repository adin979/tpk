import {Link} from 'react-router-dom'

const links={
    Home:{path:'/',icon:'home.svg'},
    Insert:{path:'/insert-data',icon:'add.svg'},
    Dashboard:{path:'/dashboard',icon:'dashboard.svg'}
}
function Navbar({...props}){
    return(
        <nav className='d_flex jc_end pr_0.5rem w_48 ai_ct Spt_1rem h_fit w_var:full bs_border-box' {...props}>
            <ul className='d_grid gtc_1fr ai_ct jc_sb w_70 gap_1rem '>
                {Object.entries(links).map(([label, path]) => (
                    <li key={label}><Link to={path['path']} className='cl_black w_var:full d_flex jc_sb ai_ct td_nn hov-cl_rgba:0~0~255~1E'>
                        {label}
                        <img src={path['icon']} alt="" />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
   )
}

export default Navbar