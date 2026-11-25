import { useEffect, useRef, useState} from 'react';
import customFetch from '../util/customFetch';
import { type DataKk,type DataWarga } from '../util/Constanta';
import UpdateKk from '../component/UpdateKk';
import Card from '../component/Card';
import { useLoading } from '../component/Loading';
function Dashboard() {
    const [dataKk, setDataKk] = useState<DataKk[]>([]);
    const [warga, setWarga] = useState<DataWarga[]>([]);
    const [selectedKk,setSelectedKk] =useState<DataKk|null>(null)
    const [limit,setLimit]=useState<number>(1)
    const [offset,setOffset]=useState<number>(0)
    const [updateKk,setUpdateKk]=useState<DataKk|null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const {showLoading,hideLoading}=useLoading()
    const sentinelRef = useRef(null)
    const loadingRef = useRef(false)
    const [hashMore,setHashMore] = useState(false)

  useEffect(() => {
    const dataWarga =()=>{
        showLoading();
        customFetch(`/datakk?limit=${limit}&offset=${dataKk.length}`)
        .then(res=>res.data)
        .then((data) => {
            setDataKk(data)
            setOffset(prev=>prev+data.length)
            setHashMore(limit=== data.length)
        })
        .catch((error) => console.error(error))
        .finally(()=>{
            hideLoading()
            loadingRef.current=false
        })
    }
    dataWarga()
    }, []);

    const nextBatch=()=>{
        if(loadingRef.current || !hashMore)return;
        setLoading(true)
        loadingRef.current=true;
        customFetch(`/datakk?limit=${limit}&offset=${dataKk.length}`)
        .then(res=>res.data)
        .then(data=>{
            console.log(data.length,dataKk)
            setDataKk((prev)=>[...prev,...data])
            setOffset(prev=>prev+data.length)
            setHashMore(limit === data.length)
        })
        .catch(error=>console.error(error))
        .finally(()=>{
            setLoading(false)
            loadingRef.current=false
        })
    }

    useEffect(()=>{
        const target = sentinelRef.current;
        if(!target || !hashMore)return;
        const observer = new IntersectionObserver(
            (entries)=>{
                if(entries[0].isIntersecting){
                    nextBatch();
                }
            },{rootMargin:'120px'}
        )
        observer.observe(target)
        return ()=>{
            observer.disconnect()
        }
    },[dataKk,hashMore])

    function detailHandle(kk:DataKk){
        setSelectedKk(null)
        setSelectedKk(kk)
        showLoading()
        return customFetch(`/warga/kk/${kk.id}`)
        .then(res=>res.data)
        .then(data=>setWarga(data))
        .catch(error=>error)
        .finally(()=>{hideLoading()})
    }
    function updateData(id: number | null | undefined){
        const data = dataKk.find(kk=>kk.id===id)
        setUpdateKk(data??null)
    }
    return (
        <div className='minh_100vh Sp_0S1rem p_2px d_flex gap_12px fd_col ff_var:sans'>
            <div className='d_flex jc_sb ai_flex-start gap_0.5rem '>
                <div>
                    <h1 className='text-heading bold text-2xl'>Data Kepala Keluarga</h1>
                    <p className='fs_small mt_0.5rem cl_var:text-secondary'>Gulir kebawah untuk memuat data otomatis</p>
                </div>
                <span className='cl_var:accent bd_1px_solid_var:accent brd_0.6rem d_flex gap_0.25rem ai_ct p_0.25rem semi-bold'>
                    <span className='w_0.5rem h_0.5rem d_block bg_var:accent brd_100%'></span>
                    <span className='d_block'>124.000</span>
                </span>
            </div>
            <Card className='pos_sti t_4rem bg_white z-20E box-sizing_border-box'>
                <div className='d_flex jc_sb ai_ct gap_0.5rem w_100%'>
                    <label htmlFor="search" className='fs_var:text-sm lh_var:line-sm fw_var:bold ff_var:sans gap_0.735rem d_flex ai_ct'>
                        <svg className="w_1rem h_1rem  cl_var:accent fw_600E" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        <span>Pencarian Cepat</span>
                    </label>
                    <span className='cl_var:text-muted fs_var:text-xs brd_0.5rem tw_var:medium p_0.2rem_0.625rem bg_var:border-color'>Menampilkan 12 dari {dataKk.length} kk</span>
                </div>
                <div className='pos_rel t_0 b_0 l_0 r_0 w_100%'>   
                    <div className='pos_abs d_flex pl_0.5rem t_0.65rem ai_ct '>
                        <svg className="w_1rem h_1rem" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    </div>
                    <input type="text" id='search' className='bsz_border-box brd_0.75rem p_0.625rem_2.5rem w_100% bg_var:border-color bd_1px_solid_var:border-color' />
                </div>
                <div className='w_100 d_flex gap_1rem ff_var:sans'>
                    <button className='brd_0.75rem cl_var:bg-surface bg_var:accent bd_1px_soolid_var:border-color sb_1px_2px_3px_var:border-color p_0.4rem'>Semua Data</button>
                    <button className='brd_0.55rem'>Semua </button>
                    <button className='brd_0.55rem'>Semua </button>
                </div>
            </Card>
            <div className='d_grid fs_1rem '>
                <section className='d_flex gap_12px fd_col'>
                        {/* card items */}
                    {dataKk.map((kk,index)=>(
                        <Card key={index+1}>
                            <div className=" p_16px brd_12px d_flex w_100 jc_sb">
                                <div className="d_flex fd_col gap_4px">
                                    <div className="d_flex ai_ct gap_6px ff_var:mono">
                                        <span className="bg_Hdbeafe cl_H1d4ed8E fs_11px fw_600E p_2pxS8px brd_99px">#{index+1}</span>
                                        <span className="fs_12px bg_var:border-color cl_H64748b ">{kk.no_kk}</span>
                                    </div>
                                    <h3 className="m_0px fs_var:text-base lh_var:line-base ff_var:sans fw_var:bold cl_H0f172a ">{kk.nama_kepala_keluarga}</h3>
                                    <span className="fs_var:text-xs cl_var:text-muted lh_var:line-xs ff_var:mono">Kepala Keluarga</span>
                                </div>
                                <div className='d_inline-flex fd_col gap_1rem'>
                                <button className='cur_poin bg_#e4e37133E brd_var:text-xs bc_#e4e371E cl_#e4e371E text-sx' aria-label='Update KK' onClick={()=>updateData(kk?.id)}>
                                    <svg className='va_middle' stroke='currentColor' viewBox="0 0 24 24" height="18px" width="18px" fill="currentColor">
                                        <path d="M14,22V18.93l5.53-5.5q0.22-0.22 0.5-0.32T20.58,13q0.3,0 0.57,0.11q0.27,0.11 0.5,0.34l0.93,0.93q0.2,0.22 0.31,0.5T23,15.43t-0.1,0.56T22.58,16.5L17.08,22H14Zm7.5-6.58L20.58,14.5l0.92,0.92Zm-6,5.08h0.95l3.03-3.05l-0.45-0.47l-0.48-0.45L15.5,19.55V20.5ZM6,22q-0.82,0-1.41-0.59T4,20V4Q4,3.17 4.59,2.59T6,2h8l6,6v3H18V9H13V4H6V20h6v2H6Zm7-10Zm6.03,4.98l-0.48-0.45l0.93,0.93l-0.45-0.47Z"/>
                                    </svg>
                                </button>
                                <button className="bc_var:accent bg_var:accent-soft cl_var:accent brd_var:text-xs text-sx cur_poin" aria-label='Detile KK' onClick={()=>detailHandle(kk)}>
                                    <svg className='va_middle' viewBox="0 0 24 24" height="18px" width="18px" stroke='currentColor' fill="currentColor">
                                        <path d="M7.45,17.45l-1.4-1.4L9.08,13H2V11H9.08L6.05,7.95l1.4-1.4L12.9,12L7.45,17.45ZM13,17V15h9v2H13Zm0-8V7h9V9H13Zm3,4V11h6v2H16Z"/>
                                    </svg>
                                </button>
                                </div>
                            </div>
                        {selectedKk?.id === kk.id &&
                        <div>
                        <div className='pos_fix bg_var:text-muted ops_0.5E l_0 r_0 t_0 b_0 z_99E'></div>
                        <Card className='tst_all_var:transit t_50% trs_-50%-50% h_50vh pos_fix z_99E'>
                        <div className=' mt_1rem d_flex w_fit h_fit fd_col gap_12px Sfs_10px bg_white trs'>
                            <span >Anggota keluarga : </span>
                            {warga.map((w,i)=>(
                                <div key={i+1} className='d_grid gtc_1fr_1fr Mfs_0.8rem bd_1px_solid_He2e8f0E bsd_0_1_3_var:accent-shadow p_0D2rem brd_0D2rem ' >
                                    <span>NIK : {w.nik}</span>
                                    <span>Nama : {w.nama_lengkap}</span>
                                </div>
                            ))}
                        </div>
                            <button className="bg_var:accent cl_Hffffff bd_nn p_8px_14px brd_8px fs_12px fw_var:semi-bold lh_var:line-xs cur_poin" onClick={()=>setSelectedKk(null)}>tutupX {'>'}</button>
                        </Card>
                        </div>}
                        </Card>
                    ))}
                <div ref={sentinelRef}>
                    {hashMore
                    ?loading
                        ?<span className='loading-text'>Memuat</span>
                            :'gulir ke bawah untuk memuat lagi'
                        :'data sudah habis'}
                </div>
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

export default Dashboard