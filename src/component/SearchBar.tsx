import type { InputHTMLAttributes, SelectHTMLAttributes } from "react"

interface SearchProps{
    input?:InputHTMLAttributes<HTMLInputElement>
    select?:SelectHTMLAttributes<HTMLSelectElement>
    options?:string[]|number[]
}
export default function SearchBar({input,select,options}:SearchProps){
    return(
        <div className="bg_Hfff p_12 brd_12 bd_1SsolidSHe2e8f0E d_flex fd_col gap_10">
            <div className="d-flex jc_sb ai_ct">
                <span className="fs_14 fw_600E cl_H331455E">Pencarian</span>
                <div className="d_flex ai_ct gap_6 fs_12 cl_H64748b">
                    <span>Show : </span>
                    <select onSelect={select?.onSelect} className="p_4S8 brd_6 bd_1SsolidSHcbd5e1E bg_Hf8fafc" {...select}>
                        {options?.map((option) => (
                            <option key={option} value={option}>{String(option)}</option>
                        ))}
                    </select>
                </div>
            </div>
            <input type="text" className="w_100P box-sizing_border-box p_10S12 brd_8 bd_1pxSsolidSHcbd5e1E fs_13 outline_nn" {...input} />
        </div>
    )
}