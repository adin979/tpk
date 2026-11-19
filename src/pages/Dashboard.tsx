import { useEffect, useState} from 'react';
import customFetch from '../util/customFetch';
import { type DataKk,type DataWarga } from '../util/Constanta';
import Loading from '../component/Loading';
import SearchBar from '../component/SearchBar';

function Home() {
  const [dataKk, setDataKk] = useState<KartuKeluarga[]>([]);
  const [warga, setWarga] = useState<DataWarga[]>([]);
  const [selectedKk,setSelectedKk] =useState<KartuKeluarga|null>(null)
  const [loading,setLoading]=useState<boolean>(false)
  const [limit,setLimit]=useState<number>(10)
  const [offset,setOffset]=useState<number>(0)

  interface KartuKeluarga extends DataKk{
    anggota_keluarga?:DataWarga[]
  }

//     const dataKkDummy:KartuKeluarga[]=[
//     {
//         alamat : "KP BOJONGJATI",
//         desa_kelurahan: "SUKAMAHI",
//         id: 1,
//         image_url: "undefined",
//         kabupaten_kota: "CIANJUR",
//         kecamatan: "CIJATI",
//         nama_kepala_keluarga: "DERI",
//         no_kk: "3203290906260001",
//         provinsi : "JAWA BARAT",
//         rt_rw : "002/001"
//     },
//     {
//         alamat : "KP BOJONGJATI",
//         desa_kelurahan: "SUKAMAHI",
//         id: 2,
//         image_url: "undefined",
//         kabupaten_kota: "CIANJUR",
//         kecamatan: "CIJATI",
//         nama_kepala_keluarga: "ABDI SAE",
//         no_kk: "3203290906260002",
//         provinsi : "JAWA BARAT",
//         rt_rw : "002/001",
//     },
//     {
//         alamat : "KP BOJONGJATI",
//         desa_kelurahan: "SUKAMAHI",
//         id: 3,
//         image_url: "undefined",
//         kabupaten_kota: "CIANJUR",
//         kecamatan: "CIJATI",
//         nama_kepala_keluarga: "BUDI DARYANTO",
//         no_kk: "3203290906260003",
//         provinsi : "JAWA BARAT",
//         rt_rw : "002/001",
//     }
// ]
// const dataWargaDummy:DataWarga[]=
//     [
//         {
//             id: 1,
//             nama_lengkap: "DERI",
//             nik: "3203290301040005",
//             jenis_kelamin: "LAKI-LAKI",
//             tempat_lahir: "CIANJUR",
//             tanggal_lahir: "2004-01-03",
//             status_hubungan: "KEPALA KELUARGA",
//             no_kk: "3203290906260001"
//         },
//         {
//             id: 2,
//             nama_lengkap: "SEFFIANNY NABILA AZHARI",
//             nik: "3302145009030001",
//             jenis_kelamin: "PEREMPUAN",
//             tempat_lahir: "BANYUMAS",
//             tanggal_lahir: "2003-09-10",
//             status_hubungan: "ISTRI",
//             no_kk: "3203290906260001"
//         },
//         {
//             id: 3,
//             nama_lengkap: "ANINDYA ZEA ALMAHIRA",
//             nik: "3203294110250001",
//             jenis_kelamin: "PEREMPUAN",
//             tempat_lahir: "KABUPATEN CIANJUR",
//             tanggal_lahir: "2025-10-01",
//             status_hubungan: "ANAK",
//             no_kk: "3203290906260001"
//         },
//         {
//             id: 1,
//             nama_lengkap: "ABDI SAE",
//             nik: "3203290301040001",
//             jenis_kelamin: "LAKI-LAKI",
//             tempat_lahir: "CIANJUR",
//             tanggal_lahir: "2004-01-03",
//             status_hubungan: "KEPALA KELUARGA",
//             no_kk: "3203290906260002"
//         },
//         {
//             id: 2,
//             nama_lengkap: "NABILA AZHARI",
//             nik: "3302145009030001",
//             jenis_kelamin: "PEREMPUAN",
//             tempat_lahir: "BANYUMAS",
//             tanggal_lahir: "2003-09-10",
//             status_hubungan: "ISTRI",
//             no_kk: "3203290906260002"
//         },
//         {
//             id: 3,
//             nama_lengkap: "ALMAHIRA",
//             nik: "3203294110250001",
//             jenis_kelamin: "PEREMPUAN",
//             tempat_lahir: "KABUPATEN CIANJUR",
//             tanggal_lahir: "2025-10-01",
//             status_hubungan: "ANAK",
//             no_kk: "3203290906260002"
//         },
//         {
//             id: 1,
//             nama_lengkap: "BUDI DARYANTO",
//             nik: "3203290301040005",
//             jenis_kelamin: "LAKI-LAKI",
//             tempat_lahir: "CIANJUR",
//             tanggal_lahir: "2004-01-03",
//             status_hubungan: "KEPALA KELUARGA",
//             no_kk: "3203290906260003"
//         },
//         {
//             id: 2,
//             nama_lengkap: "DINDA NABILA AZHARI",
//             nik: "3302145009030001",
//             jenis_kelamin: "PEREMPUAN",
//             tempat_lahir: "BANYUMAS",
//             tanggal_lahir: "2003-09-10",
//             status_hubungan: "ISTRI",
//             no_kk: "3203290906260003"
//         }
//     ]
  useEffect(() => {
    const dataWarga =()=>{
        setLoading(true)
        return customFetch(`/datakk?limit=${limit}&offset=${offset}`)
        .then(res=>res.data)
        .then((data) => {
            console.log(data)
        setDataKk(Array.isArray(data) ? data : [])
        })
        .catch((error) => console.error(error))
        .finally(()=>setLoading(false))
    }
    dataWarga()
    }, [limit, offset]);
    function detailHandle(kk:KartuKeluarga){
        setSelectedKk(null)
        setSelectedKk(kk)
            setLoading(true)
            return customFetch(`/kk/${kk.no_kk}/warga`)
            .then(res=>res.data)
            .then(data=>setWarga(data))
            .catch(error=>error)
            .finally(()=>{setLoading(false)})
    }
    return (
        <div className='minh_100vh Sp_0S1rem p_2 d_flex gap_12 fd_col'>
        {loading&&<Loading/>}
        <SearchBar options={[1,2,5]} select={{onChange:(e)=>setLimit(parseInt((e.target as HTMLSelectElement).value)),value:limit}}/> 
            <div className='d_grid fs_1rem '>
                <section className='d_flex gap_12 fd_col'>
                        {/* card items */}
                    {dataKk.map((kk,index)=>(
                        <article key={index+1} 
                        className='bg_Hffffff bd_1SsolidSHe2e8f0E box-shadow_0S1S3SrgbaF0K0K0K0D05E d_flex fd_col p_16 brd_12'>
                            <div className=" p_16 brd_12 d_flex jc_sb ai_ct">
                                <div className="d_flex fd_col gap_4">
                                    <div className="d_flex ai_ct gap_6">
                                        <span className="bg_Hdbeafe clH1d4ed8E fs_11 fw_600E p_2S8 brd_99">#1</span>
                                        <span className="fs_12 cl_H64748b ff_monoscape">{kk.no_kk}</span>
                                    </div>
                                    <h3 className="m_0 fs_15 fw_700E cl_H0f172a">{kk.nama_kepala_keluarga}</h3>
                                    <span className="fs_12 cl_H64748b">Kepala Keluarga</span>
                                </div>
                                {selectedKk?.no_kk===kk.no_kk?
                                    <button className="bg_H2563eb cl_Hffffff bd_nn p_8S14 brd_8 fs_12 fw_600E cur_poin" onClick={()=>setSelectedKk(null)}>Tutup</button>
                                    :<button className="bg_H2563eb cl_Hffffff bd_nn p_8S14 brd_8 fs_12 fw_600E cur_poin" onClick={()=>detailHandle(kk)}>Detail</button>
                                }
                            </div>
                        {selectedKk?.id === kk.id &&
                        <div className=' mt_1rem d_flex fd_col gap_12 Sfs_10'>
                            <span >Anggota keluarga : </span>
                            {warga.map((w,i)=>(
                                <div key={i+1} className='d_grid gtc_1frS1fr bd_1pxSsolidSHe2e8f0E box-shadow_0S1S3SrgbaF0K0K0K0D05E p_8 brd_8 ' >
                                    <span>NIK : {w.nik}</span>
                                    <span>Nama : {w.nama_lengkap}</span>
                                </div>
                            ))}
                        </div>}
                        </article>
                    ))}
                </section>
            </div>
            <div className='d_flex p_12 jc_sb cur_poin'><span onClick={()=>setOffset(10)}>{'<<'}</span><span onClick={()=>setOffset(10)}>{'>>'}</span></div>
        </div>
  );
}

export default Home