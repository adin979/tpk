import {useState, type SubmitEvent } from "react"
import { FormEl } from "../component/FormEl"
import InputField from "../component/InputField"
import { login } from "../util/functions"
import { useNavigate } from "react-router-dom"
import { toast } from "../component/toast/toastContex"
import { useAuth,type Role } from "../context/AuthContext"
import Loading from "../component/Loading"

export default function Register(){
    const [loading,setLoading]=useState<boolean>(false)
    const {login:authLogin}=useAuth()
    const navigate=useNavigate()
    function handleSubmit(e: SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        const formEl = e.currentTarget
        const formData=new FormData(formEl)
        const data =Object.fromEntries(formData)
        const {username,password,role} = data
        const BASE_URL = import.meta.env.VITE_BACKEND_URL|| 'http://localhost:3000'
        setLoading(true)
        return fetch(`${BASE_URL}/register`,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({username:username,password:password,role:role})
        })
        .then(res=>res.json())
        .then(result=>{
            toast('success','Daftar Berhasil!')
            const{username,password}=result[0].data.username
            if(!username)toast('error','Daftar Gagal!!')
            if(username){
        login(String(username ?? ''),String(password ?? ''), (error, data) => {
            const role = (data as { role?: string } | undefined)?.role
            const token = (data as { token?: string } | undefined)?.token
            if(token){
                toast('success','Berhasil Login')
                authLogin(token as string,role as Role)
                navigate('/', { replace: true })
            }else{toast('error',`Login Gagal ${error}`)}
            setLoading(false)
        })
            }
        })
        .catch(error=>{
            toast('error',`Daftar Gagal!!! ${error}`)
        })
    }
    return(
        <div className="minh_100vh d_flex jc_ct bg_linear-gradientF45degKH578ef5Ktransparent">
            {loading && <Loading />}
            <div className="d_flex pos_rel top_100 p_1remS1remS2remS1rem h_fit jc_ct bg_H65d0f4E ai_ct">
                <FormEl title="Registrasi" onSubmit={handleSubmit}
                button={{text:"Login",className:"p_12 brd_8 fs_13 fw_600E cur-poin bg_H2563eb cl_Hffffff bd_nn bsd_3S3S4SHb5b3b2E"}}>
                    <InputField
                        label={{content:"Username"}}
                        type="text"
                        name="username"
                        id="username"
                        />
                    <InputField
                        label={{content:"Password"}}
                        type='password'
                        name="password"
                        id="password"
                        />
                    <InputField 
                        label={{content:"Role"}}
                        name="role"
                        id="role"
                    />
                </FormEl>
            </div>
        </div>

    )
}