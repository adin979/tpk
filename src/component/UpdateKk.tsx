import { useEffect, useState, type ChangeEvent, type ReactNode, type SubmitEvent } from "react"
import { FormEl } from "./FormEl"
import InputField from "./InputField"
import type { DataKk } from "../util/Constanta"
import customFetch from "../util/customFetch"
import { toast } from "./toast/toastContex"
import Card from "./Card"

interface Props{
    data:DataKk
    children:ReactNode
}
export default function UpdateKk({data,children}:Props){

    const [updatedData,setUpdatedData]=useState<DataKk>({
        id:null,
        no_kk: '',
        nama_kepala_keluarga: '',
        alamat: '',
        rt_rw: '',
        desa_kelurahan: '',
        kecamatan: '',
        kabupaten_kota: '',
        provinsi: '',
        image_url:''
    })

    useEffect(()=>{
        const setData=()=>setUpdatedData(data)
        if(data)setData()
    },[data])

    function handleKkChange(e:ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const {name,value} = e.currentTarget
        setUpdatedData({...updatedData,[name]:name==='image_url'?value:value.toUpperCase()})
    }
    async function update(e:SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        let result;
        try {
            result = await customFetch(`/datakk/${updatedData.id}`,{
                method:'PUT',
                body:updatedData
            })
            const data =result.data
            if(!data)toast('error','Update data gagal!!')
            toast('success',`Data berhasil diupdate ${Object.keys(data).map(d=>`${d} = ${data[d]} \n`)}`)
        } catch (error) {
            toast('error',`Update data gagal!! ${error}`)
        }
    }
    return(
        <Card className="pos_fix top_0 z_99E overflow_auto as_ct w_70vw p_1rem">
            <FormEl 
            onSubmit={update}
            title="UPDATE KARTU KELUARGA"
            button={{text:'Update'}}
            >
                {(Object.keys(updatedData) as (keyof DataKk)[]).map((v,i)=>{
                    return(
                        v !== 'id' &&
                        <InputField 
                        key={i}
                        label={{content:v.replace(/_/g,' ').toLocaleUpperCase(),className:v === 'alamat'?'Mgrid-column_1E_L_-1E':''}}
                        id={v}
                        name={v}
                        value={updatedData[v]}
                        disabled={v==='image_url'?true:false}
                        className={v!=='image_url'?'textTransform_uppercase':''}
                        required
                        maxLength={v === 'no_kk'?16:undefined}
                        inputMode={v === 'no_kk' ? 'numeric' : undefined}
                        onChange={handleKkChange}
                        />
                    )
                })}
            </FormEl>
                {children}
        </Card>
    )
}