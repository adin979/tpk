import type { ReactNode } from "react"

interface CardProf{
    title?:string,
    children:ReactNode
    description?:string
    number?:string
    className?:string
}
export default function Card({title,description,number,className,children,...props}:CardProf){
    return(
        <article className={`bg_white bd_1px_solid_He2e8f0E brd_12px p_26px box-shadow_0_1px_3px_rgba-0K0K0K0D05E
         d_flex jc_sb fd_col ${className?className:''}`} {...props}>
            <div className="d_flex fd_col gap_4px">
                <div>
                <div className="cl_H8794a6E fs_12px m_0">{number||''}</div>
                    <h2 className="font_700E_17px_Manrope m_0S0S30px">{title}</h2>
                    {description&&<p>{description}</p>}
                </div>
            </div>
            {children}
        </article>
    )
}