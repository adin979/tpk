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
        <div className={`pos_fix t_20px r_20px cl_#ffffff 
        p_12px_20px brd_8px bsd_0_4px_12px_rgba:0~0~0~0.15E 
        d_flex ai_ct gap_12px z_9E ff_var-font-sans fs_14px
        ${isSuccess?'bg_#10b981E':'bg_#ef4444E'}`} role="alert">
            <span>{isSuccess?'Success':'Failed'}</span>
            <span>{data.message}</span>
            <button onClick={onClose} className="bg_transparent bd_nn cl_Hffffff cur_poin fs_16px fw_bold ml_8px">&times;</button>
        </div>
    )
}