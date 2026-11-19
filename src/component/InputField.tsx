import { useState, type InputHTMLAttributes, type LabelHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:LabelHTMLAttributes<HTMLLabelElement>,
}
const InputField = ({label,...props}:InputProps)=>{
    const [showPassword,setShowPassword]=useState(false)
    const isPasswordType=props.type==='password'
    props.className='w_100P minh_2rem bd_1pxSsolidSHdce4ee brd_8px outline_nn cl_H24364d bgHfff font-size_13px transition_borderSD15sKSbox-shadowSD15s'
    const inputType=isPasswordType?(showPassword?'text':'password'):props.type
    return(
        <>
            <label htmlFor={props.id} className='d_flex fd_col gap_7 minw_0' {...label} >
                <span className="color_H42536a font-size_12px font-weight_600">{label.content}{props.required&&<b className="cl_red">*</b>}</span>
                <div className={isPasswordType?'d_grid gtc_90P1fr':''}>
                <input {...props} type={inputType} className={`${props.className}`}/>
                {isPasswordType&&(<button type="button" className="bg_Hf1f1f1 p_2 bd_nn outline_nn brd_0S8S8S0" onClick={()=>setShowPassword(!showPassword)}>SP</button>)}
                </div>
            </label>
        </>
    )
}

export default InputField