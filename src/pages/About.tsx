import { useNavigate } from "react-router-dom"

function About(){
    const navigate = useNavigate()
    const toHome = ()=>navigate('/')
    return(
    <>
        <h2>Ini halaman About</h2>
        <button onClick={toHome}>Home</button>
    </>
)
}

export default About