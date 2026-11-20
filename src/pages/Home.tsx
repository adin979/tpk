import { useEffect, useState } from 'react';
import customFetch from '../util/customFetch';
import Card from '../component/Card';
import Loading from '../component/Loading';
import { type DataKk,type DataWarga } from '../util/Constanta';


function Home() {
  const [warga, setWarga] = useState<DataWarga[]>([]);
  const [kk,setKk]=useState<DataKk[]>([])
  const [loading,setLoading]=useState<boolean>(false)

  useEffect(() => {
    const dataWarga =()=>{
        setLoading(true)
        customFetch('/warga')
        .then(res=>res.data)
        .then((data) => {
            setWarga(Array.isArray(data) ? data : [])
          })
          .catch((error) => console.error(error))
          .finally(()=>setLoading(false))
        }
    dataWarga()
  }, []);

  useEffect(() => {
    const dataKeluarga =()=>{
      try {
        setLoading(true)
        customFetch('/datakk')
        .then(res=>res.data)
          .then((data) => {
            setKk(Array.isArray(data) ? data : [])})
            .catch((error) => console.error(error));        
          } catch (error) {
            return error
          }finally{setLoading(false)}
        }
    dataKeluarga()
  }, []);
  return (
    <div className='bg_Hffffff p_12px brd_12px bd_1SsolidSHe2e8f0E d_flex fd_col gap_10px'>
      {loading&&<Loading/>}
      <div className='d_flex jc_sb ai_ct'>
        <span className='fw_600E ta_ct fs_14px cl_H334155E m_auto'>SYSTEM INFORMASI TIM PENDAMPING KELUARGA (TPK)</span>
      </div>
      <div className="d_flex jc_ct fd_col Mgap_2rem Mp_2rem">
        {/* informasi */}
        <div className="d_grid Sgtc_1fr Mgtc_repeat-2E__minmax-0px__1fr Mgap_1rem jc_se">
          <Card title='INFOGRAFIS'>
            <div className='d_flex fd_col ta_start gap_1em'>
              <div>Jumlah Keluarga : {kk.length}</div>
              <div>Jumlah Penduduk : {warga.length}</div>
              <div>Laki-laki {warga.filter(w => w.jenis_kelamin.toLocaleLowerCase() === 'laki-laki').length}</div>
              <div>Laki-laki {warga.filter(w => w.jenis_kelamin.toLocaleLowerCase() === 'perempuan').length}</div>
              <div>Kategori Usia</div>
            </div>
          </Card>
          <Card title='Profil singkat Tim Pendamping'>
            <div className='d_flex fd_col gap_1em ta_start'>
              <div className='ff_CJetBrainsSMonoCKCsans-serifC'>Anggota</div>
              <ul>
                <li>Anggota 1</li>
                <li>Anggota 2</li>
                <li>Anggota 3</li>
                <li>Anggota 4</li>
                <li>Anggota 5</li>
              </ul>
            </div>
          </Card>
        </div>
      {/* acara */}
        <div>
          <div>
            <h2>Agenda</h2>
            <div>
              <ul>
                <li>Tugas 1</li>
                <li>Tugas 2</li>
                <li>Tugas 3</li>
              </ul>
            </div>
          </div>
        </div>
        {/* berita umum */}
        <div>
          <h2>Berita</h2>
          <div>Berita 1</div>
        </div>
        {/* dokumentasi tim */}
        <div>
          <h2>Dokumentasi</h2>
          <div>
            <p>kegiatan 1</p>
            <p>kegiatan 2</p>
            <p>kegiatan 3</p>
          </div>
        </div>
      </div>
   </div>
  );
}

export default Home