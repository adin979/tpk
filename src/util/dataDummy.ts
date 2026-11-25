import { type DataKk,type DataWarga } from "./Constanta.ts"

    function generateFamilyDataset(totalRecords:number = 1240) {
        const rand = Math.random
    const firstNames = [
        'DERI', 'HENDRA', 'ASEP', 'BUDI', 'DEDI', 'M. RIZKI', 'AGUS', 'IRFAN', 'UJANG', 'DADANG',
        'CECEP', 'YUSUF', 'RAHMAT', 'ANDI', 'EKO', 'FAJAR', 'GILANG', 'HERMAN', 'INDRA', 'JOKO',
        'KURNIAWAN', 'LUKMAN', 'MULYANA', 'NANANG', 'OPAN', 'PARMAN', 'RENDI', 'SOLEH', 'TATANG', 'WAHYU',
        'YAYAT', 'ZAINAL', 'ADE', 'BAMBANG', 'CUCU', 'DENI', 'ENDANG', 'FIRMAN', 'GUNAWAN', 'HAMDAN'
    ];
    const lastNames = [
        '', 'GUNAWAN', 'SAEPUDIN', 'SANTOSO', 'SUPRIADI', 'FAUZI', 'SALIM', 'HAKIM', 'HERMAWAN', 'PERMANA',
        'HIDAYAT', 'NUGRAHA', 'RAMADHAN', 'SURYANA', 'KUSNADI', 'SETIAWAN', 'PRATAMA', 'WIJAYA', 'MAULANA', 'ISKANDAR',
        'SUTISNA', 'ROHMAN', 'BAHTIAR', 'FIRMANSYAH', 'SAPUTRA', 'DARMAWAN', 'RUSTANDI', 'SUDRAJAT', 'SUNARYA', 'KOSASIH'
    ];
    const femaleNames = [
        'SITI AMINAH', 'RINA MARLINA', 'NENG YULIANTI', 'DEWI LESTARI', 'AI ROHAETI', 'FITRIANI', 'TATI SUMIATI',
        'NURUL HIDAYAH', 'EUIS KOMALASARI', 'YANTI SUSANTI', 'ANI SURYANI', 'LILIS KARLINA', 'IDA FARIDA', 'NINA HERLINA',
        'RANI ANGGRAENI', 'SRI WAHYUNI', 'TETI ROSTIKA', 'WULAN SARI', 'YULI YANTI', 'IMAS MASITOH'
    ];
    const childNames = [
        'ARSYILA PUTRI', 'RAFAEL', 'NAYLA PUTRI', 'DIMAS PRATAMA', 'ZAHRA AULIA', 'ILHAM RAMADHAN',
        'KENZIE ALFARIZI', 'ALIF FIRMANSYAH', 'KEYLA AZZAHRA', 'FAHRI AKBAR', 'NADIA PUTRI', 'RAIHAN',
        'SHAKILA', 'ARKAN', 'SALSA BILLA', 'DAFFA', 'AQILA', 'RIZKY', 'HANIF', 'SYIFA'
    ];
    const villages = [
        'Kp. Cugenang',
        'Kp. Pasir Hayam',
        'Kp. Babakan Jati',
        'Perum Griya Asri Blok B4',
        'Kp. Mekarsari',
        'Kp. Sukamaju',
        'Kp. Bojong Koneng',
        'Kp. Hegarmanah'
    ];

    const rtrw=['001','002','003','004']

    const records = [];

    for (let i = 1; i <= totalRecords; i++) {
        // Exact #1 match from user's screenshot
        if (i === 1) {
            records.push({
                id: 1,
                no_kk: '3203290906260001',
                nama_kepala_keluarga: 'DERI',
                alamat: 'Kp. Cugenang',
                rt_rw:'001/001',
                desa_kelurahan:'Sukamaju',
                kecamatan:'Cikadu',
                kabupaten_kota:'Cianjur',
                provinsi:'Jawa Barat',
                image_url:'undefined',
                anggota: [
                    {id:i, nama_lengkap: 'DERI', nik: '3203290906950001',jenis_kelamin:'laki-laki',no_kk:'3203290906260001' , tempat_lahir:'Cianjur',tanggal_lahir:'01/07/1990', status_hubungan: 'Kepala Keluarga'},
                    {id:i+1, nama_lengkap: 'SITI AMINAH', nik: '3203295204980002',jenis_kelamin:'perempuan',no_kk:'3203290906260001' , tempat_lahir:'Cianjur',tanggal_lahir:'13/04/1995', status_hubungan: 'Istri'},
                    {id:i+2,nama_lengkap: 'ARSYILA PUTRI', nik: '3203294511230003',jenis_kelamin:'perempuan',no_kk:'3203290906260001' , tempat_lahir:'Cianjur',tanggal_lahir:'01/07/2024', status_hubungan: 'Anak'}
                ]
            });
            continue;
        }

        const fName = firstNames[(i * 7) % firstNames.length];
        const lName = lastNames[(i * 13) % lastNames.length];
        const fullName = lName && fName !== lName ? `${fName} ${lName}` : fName;

        // Deterministic 16-digit Cianjur/West Java style No. KK (320329...)
        const day = String((i % 28) + 1).padStart(2, '0');
        const month = String((i % 12) + 1).padStart(2, '0');
        const year = String(15 + (i % 11)).padStart(2, '0');
        const seq = String(i).padStart(4, '0');
        const no_kk = `320329${day}${month}${year}${seq}`;
        const tglLahir =`${day}/${month}/${String(1905+(i%100)).padStart(4,'0')}`
        const isIncomplete = i % 6 === 0;
        // const isRecent = i <= 45;
        // const statusLabel = isIncomplete ? 'Belum Lengkap' : 'Terverifikasi TPK';
        const jk = ['laki-laki','perempuan']
        const wifeName = femaleNames[(i * 3) % femaleNames.length];
        const anggota = [
            {id:i, nama_lengkap: fullName,no_kk:no_kk, nik: `320329${day}${month}${80 + (i % 19)}0001`,jenis_kelamin:'laki-laki' ,status_hubungan: 'Kepala Keluarga', tempat_lahir:'Cianjur',tanggal_lahir: `${tglLahir} Thn` },
            {id:i+1, nama_lengkap: wifeName,no_kk:no_kk, nik: `320329${String(40 + Number(day))}${month}${82 + (i % 18)}0002`,jenis_kelamin:'perempuan' ,status_hubungan: 'Istri', tempat_lahir:'Cianjur',tanggal_lahir: `${tglLahir} Thn` }
        ];

        if (!isIncomplete) {
            const c1 = childNames[(i * 5) % childNames.length];
            anggota.push({
                id:i+2,
                nama_lengkap: lName ? `${c1} ${lName}` : c1,
                nik: `320329${day}${month}${14 + (i % 10)}0003`,
                no_kk:no_kk,
                status_hubungan: 'Anak',
                tanggal_lahir: `${tglLahir}`,
                tempat_lahir:'Cianjur',
                jenis_kelamin: jk[Math.floor(rand()*jk.length)]
            });
            if (i % 3 === 0) {
                const c2 = childNames[(i * 11 + 2) % childNames.length];
                anggota.push({
                    id:i+3,
                    nama_lengkap: lName ? `${c2} ${lName}` : c2,
                    nik: `320329${day}${month}${18 + (i % 7)}0004`,
                    no_kk:no_kk,
                    status_hubungan: 'Anak',
                    tanggal_lahir: `${tglLahir}`,
                    tempat_lahir:'Cianjur',
                    jenis_kelamin: jk[Math.floor(rand()*jk.length)]
                });
            }
        }

        records.push({
            id:i,
            no_kk,
            nama_kepala_keluarga: fullName,
            alamat: `${villages[i % villages.length]}`,
            // status: statusLabel,
            // isVerified: !isIncomplete,
            // isRecent,
            rt_rw: `${rtrw[Math.floor(rand() * rtrw.length)]}/${rtrw[Math.floor(rand() * rtrw.length)]}`,
            desa_kelurahan:'Sukamaju',
            kecamatan:'Cikadu',
            kabupaten_kota:'Cianjur',
            provinsi:'Jawa Barat',
            image_url:'url/image',
            anggota
        });
    }

    return records;
}
export const dummyData = generateFamilyDataset()
export const dataKkDummy:DataKk[]=dummyData
export const dataWargaDummy:DataWarga[]=dummyData.flatMap(m=>m.anggota)
