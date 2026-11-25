import { createContext, useContext, useState, type ReactNode } from "react"

interface LoadingContextType{
    isLoading:boolean
    textLoading:string
    showLoading:(text?:string)=>void
    hideLoading:()=>void
}

const LoadingContext=createContext<LoadingContextType|null>(null)

export function LoadingProvider({children}:{children:ReactNode}){
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [textLoading,setTextLoading]=useState<string>('Memproses')

    const showLoading=(text='Memproses')=>{
        setTextLoading(text)
        setIsLoading(true)
    }
    const hideLoading=()=>{
        setIsLoading(false)
        setTextLoading('Memproses')
    }

    return(
        <LoadingContext.Provider
        value={{isLoading,textLoading,showLoading,hideLoading}}
        >
            {children}
            {isLoading&&(
                <div className="loading-overlay"><span className="loading-text">{textLoading}</span></div>
            )}
        </LoadingContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoading(){
    const ctx =useContext(LoadingContext)
    if(!ctx)throw new Error('Harus dipakai di LoadingProvider');
    return ctx
}