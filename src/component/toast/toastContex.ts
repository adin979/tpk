export type ToastType = 'success'|'error';
export interface ToastProps{
    message:string;
    type:ToastType;
}
export const TOAST_EVENT = 'custom-toast-event'
export const toast=(condition:string,message:string)=>{
    switch(condition){
        case 'success':
            window.dispatchEvent(new CustomEvent<ToastProps>(TOAST_EVENT,{detail:{message,type:'success'}}))
            break;
        case 'error':
            window.dispatchEvent(new CustomEvent<ToastProps>(TOAST_EVENT,{detail:{message,type:'error'}}))
            break
    }
}