import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    options: string[],
    label:string,
}

function Select({options,label,required=false,...props}:SelectProps){
    return(
        <label className="d_flex fd_col gap_7px minw_0">
            <span className="color_H42536a font-size_12px font-weight_600">{label}{required&&<b className="col_red">*</b>}</span>
            <select {...props} className="w_100 minh_2rem bd_1px_solid_Hdce4ee brd_8px outline_nn cl_var:text-secondary bgHfff font-size_13px transition_border_0.15s~box-shadow_0.15s">
                <option className="brd_8px bc_var:border-color" value="">{`--pilih ${label.toLocaleLowerCase()}--`}</option>
                {options.map(opt=>(
                    <option className="brd_8px bc_var:border-color" key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </label>
    )
}

export default Select