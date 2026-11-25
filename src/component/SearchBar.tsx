import type { InputHTMLAttributes, SelectHTMLAttributes } from "react"

interface SearchProps{
    input?:InputHTMLAttributes<HTMLInputElement>
    select?:SelectHTMLAttributes<HTMLSelectElement>
    options?:string[]|number[]
}
export default function SearchBar({input,select,options}:SearchProps){
    return(
        <div className="bg_Hffffff pos_sti p_12px brd_12px bd_1px_solid_He2e8f0E d_flex fd_col gap_10px">
            <div className="d-flex jc_sb ai_ct">
                <span className="fs_14px fw_600E cl_H331455E">Pencarian</span>
                <div className="d_flex ai_ct gap_6px fs_12px cl_H64748b">
                    <span>Show : </span>
                    <select onSelect={select?.onSelect} className="p_4px_8px brd_6px bd_1px_solid_Hcbd5e1E bg_Hf8fafc" {...select}>
                        {options?.map((option) => (
                            <option key={option} value={option}>{String(option)}</option>
                        ))}
                    </select>
                </div>
            </div>
            <input type="text" className="w_100 box-sizing_border-box p_10px_12px brd_8px bd_1px_solid_Hcbd5e1E fs_13px outline_nn" {...input} />
        </div>
    )
}