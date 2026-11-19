import type { ButtonHTMLAttributes, FormHTMLAttributes, ReactNode } from "react";

interface FormElrops extends FormHTMLAttributes<HTMLFormElement>{
    children: ReactNode,
    title?:string,
    button:ButtonHTMLAttributes<HTMLButtonElement> & { text: ReactNode }
}
export function FormEl({children,title,button,...props}:FormElrops){
    return(
        <>
            <form {...props} onSubmit={props.onSubmit} >
                <div className="m_1rem ta_ct">
                    <h2>{title}</h2>
                </div>
                <div className="d_flex fd_column gap_1rem">
                    {children}
                    <button type="submit" className={button.className}>{button.text}</button>
                </div>
            </form>
        </>
    )
}