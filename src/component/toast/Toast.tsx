import React, { useEffect, useState,useRef } from "react";
import { type ToastProps,TOAST_EVENT } from "./toastContex";

export const ToastContainer:React.FC=()=>{
    const [data,setData]=useState<ToastProps|null>(null)
    const timerRef=useRef<ReturnType<typeof setTimeout>|null>(null)
    useEffect(()=>{
        const handleToast=(e:Event)=>{
            const customEvent = e as CustomEvent<ToastProps>
            setData(customEvent.detail);
            if(timerRef.current)clearTimeout(timerRef.current)
            timerRef.current = setTimeout(()=>setData(null),3000)
        }
        window.addEventListener(TOAST_EVENT,handleToast)
        return()=>{
            window.removeEventListener(TOAST_EVENT,handleToast)
            if(timerRef.current)clearTimeout(timerRef.current)
        }
    },[])
    const onClose=()=>{
        setData(null)
        if(timerRef.current){clearTimeout(timerRef.current)}
    }
    if(!data)return null;
    const isSuccess=data.type==='success'
    return(
        <div className={`pos_fix t_20 r_20 cl_Hffffff 
        p_12S20 brd_8 bsd_0S4S12SrgbaF0K0K0K0D15E 
        d_flex ai_ct gap_12 z_9999E ff_sans-serif fs_14
        ${isSuccess?'bg_H10b981E':'bg_Hef4444E'}`} role="alert">
            <span>{isSuccess?'Success':'Failed'}</span>
            <span>{data.message}</span>
            <button onClick={onClose} className="bg_transparent bd_nn cl_Hffffff cur_poin fs_16 fw_bold ml_8">&times;</button>
        </div>
    )
}