export interface DataKk {
  id:number|null
  no_kk: string;
  nama_kepala_keluarga: string;
  alamat: string;
  rt_rw: string;
  desa_kelurahan?: string;
  kecamatan?: string;
  kabupaten_kota?: string;
  provinsi?: string;
  image_url?:string
}

export interface DataWarga {
  id:number|null
  no_kk: string;
  nama_lengkap: string;
  nik: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  status_hubungan: string;
}