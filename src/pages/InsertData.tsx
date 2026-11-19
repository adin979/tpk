import imageCompression from "browser-image-compression"
import { useState, type ChangeEvent, type SubmitEvent } from "react"
import InputField from "../component/InputField"
import customFetch from "../util/customFetch"
import { FormEl } from "../component/FormEl"
import Select from "../component/Select"
import Card from "../component/Card"
import { type DataKk, type DataWarga } from '../util/Constanta'
import Loading from "../component/Loading"
import { toast } from "../component/toast/toastContex"

function InsertData(){
    const [selectedFile,setSeleectedFile]=useState<File|null>(null)
    const [preview,setPreview]=useState<string>('')
    const [dataKk,setDataKk] = useState<DataKk>({
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
    const [dataWarga,setDataWarga] = useState<DataWarga[]>([{
        id:null,
        no_kk:'',
        nama_lengkap: '',
        nik: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        status_hubungan: ''
    }])
    const [loading,setLoading] = useState<boolean>(false)
    const [imageFileName,setImageFileName]=useState<string>('')
    
    const fileHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files;
        if(!files || files.length === 0)return;
        const file = files[0];
        setSeleectedFile(file)
        setPreview(URL.createObjectURL(file))
    }
    function fileSubmit(){
        setLoading(true);
        if(!selectedFile){
            alert('Pilih file terlebih dahulu!')
            return;
        }
        const options = {
            maxSizeMB: 1,          
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        imageCompression(selectedFile,options)
        .then(compressed=>{
            const uploadData = new FormData();//bawaan html
            uploadData.append('image',compressed,'image.jpeg')
            customFetch('/parse-document',{body:uploadData,method:'POST'})
            // .then(response=>response.data)
            .then(resData=>{
                console.log(resData)
                const {data,filePath} = resData
                setImageFileName(filePath)
                setDataKk({
                    id:data.id,
                    no_kk: data.no_kk,
                    nama_kepala_keluarga: data.nama_kepala_keluarga,
                    alamat: data.alamat,
                    rt_rw: data.rt_rw,
                    desa_kelurahan: data.desa_kelurahan,
                    kecamatan: data.kecamatan,
                    kabupaten_kota: data.kabupaten_kota,
                    provinsi: data.provinsi,
                    image_url:filePath
                })
                setDataWarga(data.anggota_keluarga.map((d:DataWarga)=>({...d,no_kk:data.no_kk})))
            })
            .catch(error=>error)
            .finally(()=>setLoading(false))
        })

    }
    
    function handleKkChange(e:ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const{name,value}=e.currentTarget
        setDataKk(prev=>({...prev,[name]:value.toUpperCase()}))
    }
    function handleWargaChange(index:number,field:keyof DataWarga,value:string){
        setDataWarga(prev => prev.map((item,i) => i === index ? { ...item, [field]: value.toUpperCase() } : item))
    }
    const handleSubmit=(e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const payload={...dataKk,file_path:imageFileName}
        return customFetch('/datakk',{
            method:'POST',
            body:payload
        })
        .then(data=>{
            if(data){
                toast('success','Data kk berhasi disimpan')
                return customFetch('/warga',{
                    method:'POST',
                    body:dataWarga
                })
                .then(data=>{
                    toast('success','Data warga berhasil disimpan')
                    setDataWarga(data.anggota_keluarga.map((d:DataWarga)=>({...d,no_kk:data.no_kk})))
                })
                .catch(error=>toast('error',`Gagal menyimpan ${error}`))
            }
        })
        .catch(error=>toast('error',`Gagal menyimpan ${error}`))
        .finally(()=>setLoading(false))
    }
    function addCount(e:ChangeEvent){
        console.log(e)
    }
    return (
        <div className="maxw_1120px m_0ESauto p_40pxS28pxS36px Sp_0S14pxS25px Md_grid Mgtc_1fr">
            {loading&&<Loading/>}
            {/* <div className="d_grid gap_1rem jc_se"> */}
                {selectedFile?
                <div className="d_flex pos_rel fd_col bd_1pxSsolid">
                    <img src={preview?preview:'../assets/hero.png'} className="w_auto maxh_270px " alt="preview"/>
                    <button type="button" onClick={fileSubmit}>Kirim</button>
                    <button type="button" onClick={()=>setSeleectedFile(null)}>Ganti</button>
                </div>:
                <Card title="Input File">
                <label htmlFor="image" className=" d_flex fd_col ai_ct jc_se h_170px bd_2pxSdashedSH8ab4ff brd_10px bg_Hf7faff cur_poin p_20px maxw_100">
                    <span>...</span>
                    <strong>Klik untuk memilih file</strong>
                    <small>JPEG (maks. 5 MB)</small>
                    <input type="file" name="image" id="image" onChange={fileHandler} className=""/>
                </label>
                </Card>
                }
            {/* </div> */}
            <section>
                <FormEl title='Input Data' className="" 
                button={{text:"Kirim",
                className:"p_12px brd_8px fs_13px fw_600E cur-poin bg_H2563eb cl_Hffffff bd_nn bsd_3pxS3pxS4pxSHb5b3b2E"}} 
                onSubmit={handleSubmit}>
                    <article>
                    <Card title="Input Data Kartu Keluarga">
                        <div className="d_grid Mgtc_repeatF2EKminmaxF0KS1fr gap_17pxS20px maxw_100">
                            {(Object.keys(dataKk) as (keyof DataKk)[]).map((v)=>(
                                v !== 'id' &&
                                <InputField 
                                key={v}
                                label={{content:v.replace(/_/g,' ').toLocaleUpperCase(),className:v === 'alamat'?'Mgrid-column_1ESLS-1E':''}}
                                id={v}
                                name={v}
                                value={dataKk[v]}
                                className='textTransform_uppercase'
                                required
                                maxLength={16}
                                inputMode={v === 'no_kk' ? 'numeric' : undefined}
                                onChange={handleKkChange}
                                />
                            ))}
                        </div>
                    </Card>
                    </article>
                        {dataWarga.map((member,index)=>(
                    <Card title="Input Data Anggota Keluarga" key={index+1}>
                        <div className="d_grid Mgtc_repeatF2EKminmaxF0KS1fr gap_17pxS20px">
                                <InputField 
                                label={{content:"Nomor Kartu Keluarga"}}
                                type="text"
                                name="kartu_keluarga"
                                id="kartu_keluarga"
                                value={dataKk.no_kk}
                                className='textTransform_uppercase'
                                required
                                onChange={(e)=>handleWargaChange(index,'no_kk',e.currentTarget.value)}
                                />
                                <InputField
                                label={{content:"NIK"}}
                                name='nik'
                                id="nik"
                                value={member.nik}
                                className='textTransform_uppercase'
                                required    
                                onChange={(e)=>handleWargaChange(index,'nik',e.currentTarget.value)}
                                />
                                <InputField
                                label={{content:"Nama Lengkap",className:"Mgrid-column_1ESLS-1E"}}
                                name="nama_lengkap"
                                id="nama_lengkap"
                                value={member.nama_lengkap}
                                className='textTransform_uppercase'
                                required
                                onChange={(e)=>handleWargaChange(index,'nama_lengkap',e.currentTarget.value)}
                                />
                                <Select options={['LAKI-LAKI','PEREMPUAN']} 
                                label="Jenis Kelamin"
                                name="jenis_kelamin"
                                id="jenis_kelamin"
                                value={member.jenis_kelamin}
                                onChange={(e)=>handleWargaChange(index,'jenis_kelamin',e.currentTarget.value)}
                                required/>
                                <InputField
                                label={{content:"Tempat Lahir"}}
                                name="tmp_lahir"
                                id="tmp_lahir"
                                value={member.tempat_lahir}
                                className='textTransform_uppercase'
                                required
                                onChange={(e)=>handleWargaChange(index,'tempat_lahir',e.currentTarget.value)}
                                />
                                <InputField
                                label={{content:"Tanggal Lahir"}}
                                name="tgl_lahir"
                                id="tgl_lahir"
                                value={member.tanggal_lahir}
                                required
                                type="date"
                                onChange={(e)=>handleWargaChange(index,'tanggal_lahir',e.currentTarget.value)}
                                />
                                <Select options={['KEPALA KELUARGA','ISTRI','ANAK']} 
                                label="Status Hubungan"
                                name="status_hubungan" 
                                id="status_hubungan" 
                                value={member.status_hubungan}
                                onChange={(e)=>handleWargaChange(index,'status_hubungan',e.currentTarget.value)}
                                required/>
                            </div>
                        </Card>
                        ))}
                    <button className=" bg _Hf1f5f9 cl_H334155E bd_1pxSsolidSHcbd5e1E p_12px brd_8px fs_13px fw_600E cur_poin bsd_3pxS3pxS8pxSHacacac" type="button" onChange={addCount}>Tambah Anggota Keluarga</button>
                        {loading && <div className="r_0 b_0 bg_rgbaF0EK0EK0EKD1E"><p>loading ...</p></div>}
                </FormEl>
                </section>
            </div>
    )
}

export default InsertData