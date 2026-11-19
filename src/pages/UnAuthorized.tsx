import {Link} from 'react-router-dom'
export default function UnAuthorized(){
    return (
        <div>
            <h1>404</h1>
            <p>Silahkan login untuk mengakses halaman ini</p>
            <div><Link to='/login'>Login</Link></div>
        </div>
    )
}