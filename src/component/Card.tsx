import type { ReactNode } from "react"

interface CardProf{
    children:ReactNode
    className?:string
}
export default function Card({children,className}:CardProf){
    return(
        <article className={`
            d_flex jc_sb ai_ct fd_col
            animation_0.3s_var:fade-slide-up 
            bg_#ffffff cl_var:text-primery 
            bd_1px_solid_var:border-color brd_1rem  
            bsd_0_1px_2px_0_rgba:0~0~0~0.05E
            gap_0.75rem p_1rem ${className}`}>
            {children}
        </article>
    )
}