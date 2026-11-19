import { toast } from "../component/toast/toastContex";
import customFetch from "./customFetch"
export function login(username:string|null,password:string|null,cb: (error: unknown, data?: unknown) => void){
    if(!username||!password||username===null||password===null){
        toast('error','username dan password tidak boleh kosong.!')
        return;
    }
    const body = {username:username,password:password}
    customFetch('/login',{body:body,method:'POST'})
    .then((result: unknown) => {
        const resultObject = typeof result === 'object' && result !== null
            ? result as { data?: unknown; error?: unknown }
            : undefined;
        const responseData = resultObject?.data ?? result;
        if(!responseData){
            const error = resultObject?.error ?? 'Login gagal';
            toast('error', String(error))
            return cb(error)
        }
        return cb(null,responseData)
    })

}