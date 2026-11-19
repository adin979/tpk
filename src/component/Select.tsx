import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    options: string[],
    label:string,
}

function Select({options,label,required=false,...props}:SelectProps){
    return(
        <label className="d_flex fd_col gap_7 nimw_0">
            <span className="color_H42536a font-size_12px font-weight_600">{label}{required&&<b className="col_red">*</b>}</span>
            <select {...props} className="w_100P minh_2rem bd_1pxSsolidSHdce4ee br_8px outline_nn cl_H24364d bgHfff font-size_13px transition_borderSD15sKSbox-shadowSD15s">
                <option value="">{`--pilih ${label.toLocaleLowerCase()}--`}</option>
                {options.map(opt=>(
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </label>
    )
}

export default Select