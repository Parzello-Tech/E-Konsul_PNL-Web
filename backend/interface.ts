export interface Prodi {
    prodi_id: number;
    nama_prodi: string;
}

export interface JurusanProdi {
    jurusan_id: number;
    nama_jurusan: string;
    prodi: Prodi[];
}

/* ------------------- */

export interface Mahasiswa {
    mahasiswa_id: number;
    user_id: number;
    nim: string;
    fullname: string;
    prodi_id: number | null;
    semester: number;
    bio: string;
    profile_photo: string | null;
    created_at: string;
    deleted_at: string | null;
}

export interface Dosen {
    dosen_id: number;
    user_id: number;
    nip: string;
    fullname: string;
    prodi_id: number | null;
    profile_photo: string | null;
    created_at: string;
    deleted_at: string | null;
}

export interface Konseling {
    id_konseling: number;
    mahasiswa_id: number;
    dosen_id: number;
    tujuan_konseling: string;
    topik_konseling: string;
    catatan: string;
    jenis_konseling: string;
    tanggal_konseling: string;
    waktu_mulai: string;
    waktu_selesai: string;
    status: string;
    lampiran: string | null;
    created_at: string;
    updated_at: string;
    mahasiswa: Mahasiswa;
    dosen: Dosen;
}

/* ------------------- */

export interface Profil {
    mahasiswa_id: number;
    user_id: number;
    nim: string;
    fullname: string;
    prodi_id: number;
    semester: number;
    bio: string;
    created_at: string;
    deleted_at: string | null;
}

export interface UserData {
    user_id: number;
    login_id: string;
    role_id: number;
    profile_photo: string | null;
    profil: Profil;
}

export interface LoginResponse {
    status: string;
    message: string;
    data: UserData;
}
