import { useEffect, useState } from 'react';
import customFetch from '../util/customFetch';
import Card from '../component/Card';
import { type DataKk,type DataWarga } from '../util/Constanta';
import { useLoading } from '../component/Loading';


function Home() {
  const [warga, setWarga] = useState<DataWarga[]>([]);
  const [kk,setKk]=useState<DataKk[]>([])
  const {showLoading,hideLoading}=useLoading()
  useEffect(() => {
    const dataWarga =()=>{
        showLoading()
        customFetch('/warga')
        .then(res=>res.data)
        .then((data) => {
            setWarga(Array.isArray(data) ? data : [])
          })
          .catch((error) => console.error(error))
          .finally(()=>hideLoading())
        }
    dataWarga()
  }, []);

  useEffect(() => {
    const dataKeluarga =()=>{
        showLoading()
        customFetch('/datakk')
        .then(res=>res.data)
          .then((data) => {
            setKk(Array.isArray(data) ? data : [])})
            .catch((error) => console.error(error))        
            .finally(()=>setTimeout(()=>hideLoading(),5000))
          }
    dataKeluarga()
  }, []);
  return (
    <div className='bg_#ffffff p_12px brd_12px bd_1_solid_He2e8f0E d_flex fd_col gap_10px'>
      <div className='d_flex jc_sb ai_ct'>
        <span className='fw_600E ta_ct fs_14px cl_H334155E m_auto'>SYSTEM INFORMASI TIM PENDAMPING KELUARGA (TPK)</span>
      </div>
      <div className="d_flex jc_ct fd_col Mgap_2rem Mp_2rem">
        {/* informasi */}
        <div className="d_grid Sgtc_1fr Mgtc_repeat:2E~minmax:0px~1fr Mgap_1rem jc_se">
          <Card>
            <h1>INFOGRAFIS</h1>
            <div className='d_flex fd_col ta_start gap_1em'>
              <div>Jumlah Keluarga : {kk.length}</div>
              <div>Jumlah Penduduk : {warga.length}</div>
              <div>Laki-laki {warga.filter(w => w.jenis_kelamin.toLocaleLowerCase() === 'laki-laki').length}</div>
              <div>Laki-laki {warga.filter(w => w.jenis_kelamin.toLocaleLowerCase() === 'perempuan').length}</div>
              <div>Kategori Usia</div>
            </div>
          </Card>
          <Card>
            <div className='d_flex fd_col gap_1em ta_start'>
              <div className='ff_"JetBrains_Mono"~sans-serif'>Anggota</div>
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
        <Card>
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
        </Card>
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