import { useState, type SubmitEvent } from "react";
import { login } from "../util/functions";
import { useNavigate } from "react-router-dom";
import InputField from "../component/InputField";
import { FormEl } from "../component/FormEl";
import { useAuth, type Role } from "../context/AuthContext";
import { toast } from "../component/toast/toastContex";
import Loading from "../component/Loading";

function Login(){
    const [loading,setLoading]=useState<boolean>(false)
    const {login:authLogin}=useAuth()
    const navigate = useNavigate()
    const handleSubmit = (e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const formEl=e.currentTarget
        const formData=new FormData(formEl)
        const data = Object.fromEntries(formData.entries())
        login(String(data.username ?? ''),String(data.password ?? ''), (error, data) => {
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
    return(
        <div className="minh_100vh d_flex jc_ct bg_linear-gradientF45degKH578ef5Ktransparent m_auto">
            {loading&&<Loading/>}
            <div className="d_flex pos_rel top_100 p_1remS1remS2remS1rem h_fit jc_ct bg_H65d0f4E ai_ct">
                <FormEl title="LOGIN" 
                button={{text:"Login",className:"p_12 brd_8 fs_13 fw_600E cur-poin bg_H2563eb cl_Hffffff bd_nn bsd_3S3S4SHb5b3b2E"}}
                 onSubmit={handleSubmit}>
                    <InputField
                        label={{content:"Username"}}
                        type="text"
                        name="username"
                        id="username"
                        required
                        />
                    <InputField
                        label={{content:"Password"}}
                        type='password'
                        name="password"
                        id="password"
                        required
                        />
                </FormEl>
            </div>
        </div>
    )
}

export default Login