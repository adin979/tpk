import { useEffect, useState} from 'react';
import customFetch from '../util/customFetch';
import { type DataKk,type DataWarga } from '../util/Constanta';
import SearchBar from '../component/SearchBar';
import UpdateKk from '../component/UpdateKk';
import { useAuth } from '../context/AuthContext';

function Home() {
  const [dataKk, setDataKk] = useState<DataKk[]>([]);
  const [warga, setWarga] = useState<DataWarga[]>([]);
  const [selectedKk,setSelectedKk] =useState<DataKk|null>(null)
  const [limit,setLimit]=useState<number>(10)
  const [offset,setOffset]=useState<number>(0)
  const [updateKk,setUpdateKk]=useState<DataKk|null>(null)
    const {setLoading} = useAuth() 

  useEffect(() => {
    const dataWarga =()=>{
        setLoading(true);
        return customFetch(`/datakk?limit=${limit}&offset=${offset}`)
        .then(res=>res.data)
        .then((data) => {
        setDataKk(Array.isArray(data) ? data : [])
        })
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }
    dataWarga()
    }, [limit, offset]);
    function detailHandle(kk:DataKk){
        setSelectedKk(null)
        setSelectedKk(kk)
        setLoading(true)
        return customFetch(`/datakk/${kk.no_kk}`)
        .then(res=>res.data)
        .then(data=>setWarga(data))
        .catch(error=>error)
        .finally(()=>{setLoading(false)})
    }
    function updateData(id: number | null | undefined){
        const data = dataKk.find(kk=>kk.id===id)
        setUpdateKk(data??null)
    }
    return (
        <div className='minh_100vh Sp_0S1rem p_2px d_flex gap_12px fd_col ff_var-sans'>
        <SearchBar options={[1,2,5]} select={{onChange:(e)=>setLimit(parseInt((e.target as HTMLSelectElement).value)),value:limit}}/> 
            <div className='d_grid fs_1rem '>
                <section className='d_flex gap_12px fd_col'>
                        {/* card items */}
                    {dataKk.map((kk,index)=>(
                        <article key={index+1} 
                        className='bg_Hffffff bd_1px_solid_var-border-color bsd_0_1px_3px_rgba-0__0__0__005E d_flex fd_col p_16px brd_12px'>
                            <div className=" p_16px brd_12px d_flex jc_sb ai_ct">
                                <div className="d_flex fd_col gap_4px">
                                    <div className="d_flex ai_ct gap_6px ff_var-mono">
                                        <span className="bg_Hdbeafe clH1d4ed8E fs_11px fw_600E p_2pxS8px brd_99px">#{index+1}</span>
                                        <span className="fs_12px cl_H64748b ">{kk.no_kk}</span>
                                    </div>
                                    <h3 className="m_0px fs_var-text-base lh_var-line-base ff_var-sans fw_var-bold cl_H0f172a ">{kk.nama_kepala_keluarga}</h3>
                                    <span className="fs_var-text-xs cl_var-text-muted lh_var-line-xs ff_var-mono">Kepala Keluarga</span>
                                </div>
                                <div className='d_inline-flex fd_col gap_1rem'>
                                <button onClick={()=>updateData(kk?.id)}>Update</button>
                                {selectedKk?.no_kk===kk.no_kk?
                                    <button className="bg_var-accent cl_Hffffff bd_nn p_8pxS14px brd_8px fs_12px fw_var-semi-bold lh_var-line-xs cur_poin" onClick={()=>setSelectedKk(null)}>Tutup X</button>
                                    :<button className="bg_var-accent cl_Hffffff bd_nn p_8pxS14px brd_8px fs_12px fw_var-semi-bold lh_var-line-xs cur_poin" onClick={()=>detailHandle(kk)}>Detail {'>'}</button>
                                }
                                </div>
                            </div>
                        {selectedKk?.id === kk.id &&
                        <div className=' mt_1rem d_flex fd_col gap_12px Sfs_10px'>
                            <span >Anggota keluarga : </span>
                            {warga.map((w,i)=>(
                                <div key={i+1} className='d_grid gtc_1frS1fr Mfs_0D8rem bd_1pxSsolidSHe2e8f0E bsd_0_1_3_var-accent-shadow p_0D2rem brd_0D2rem ' >
                                    <span>NIK : {w.nik}</span>
                                    <span>Nama : {w.nama_lengkap}</span>
                                </div>
                            ))}
                        </div>}
                        </article>
                    ))}
                </section>
            </div>
            <div className='d_flex p_12px jc_sb cur_poin'><span onClick={()=>setOffset(10)}>{'<<'}</span><span onClick={()=>setOffset(10)}>{'>>'}</span></div>
            {updateKk&&
            <UpdateKk data={updateKk}>
                <button onClick={()=>setUpdateKk(null)}>Batal</button>
            </UpdateKk>
                }
        </div>
  );
}

export default Home