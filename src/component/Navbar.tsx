import {Link} from 'react-router-dom'

const links={
    Home:'/',
    Insert:'/insert-data',
    Dashboard:'/dashboard'
}
function Navbar({...props}){
    return(
        <nav className='d_flex jc_sa w_48P ai_ct Spt_1rem h_fit' {...props}>
            <ul className='d_grid gtc_1fr ai_ct jc_sb w_70P gap_1rem '>
                {Object.entries(links).map(([label, path]) => (
                    <li key={label}><Link to={path} className='cl_black td_nn'>{label}</Link></li>
                ))}
            </ul>
        </nav>
   )
}

export default Navbar