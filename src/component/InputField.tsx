import { useState, type InputHTMLAttributes, type LabelHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:LabelHTMLAttributes<HTMLLabelElement>,
}
const InputField = ({label,...props}:InputProps)=>{
    const [showPassword,setShowPassword]=useState(false)
    const isPasswordType=props.type==='password'
    props.className='w_100 minh_2rem bd_1px_solid_Hdce4ee brd_8px outline_nn cl_H24364d bgHfff font-size_13px transition_border_015s__Sbox-shadow_015s'
    const inputType=isPasswordType?(showPassword?'text':'password'):props.type
    return(
        <>
            <label htmlFor={props.id} className='d_flex fd_col gap_7px minw_0' {...label} >
                <span className="color_H42536a font-size_12px font-weight_600">{label.content}{props.required&&<b className="cl_red">*</b>}</span>
                <div className={isPasswordType?'d_grid gtc_90S1fr':''}>
                <input {...props} type={inputType} className={`${props.className}`}/>
                {isPasswordType&&(<button type="button" className="bg_Hf1f1f1 p_2px bd_nn outline_nn brd_0_8px_8px_0" onClick={()=>setShowPassword(!showPassword)}>SP</button>)}
                </div>
            </label>
        </>
    )
}

export default InputField