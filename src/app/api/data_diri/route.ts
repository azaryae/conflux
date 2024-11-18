import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface CreateProfilBodyProps {
    name: string;
    email: string;
    no_hp: number;
    alamat: string;
    jenis_kelamin: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jurusan: string;
    pendidikan_terakhir: string;
    tahun_lulus: number;
    pengalaman_kerja: string;
    minat: string;
    keahlian: string;
    organisasi: string;
    hobi: string;
    prestasi: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, no_hp, alamat, jenis_kelamin, tempat_lahir, tanggal_lahir, jurusan, pendidikan_terakhir, tahun_lulus, pengalaman_kerja, minat, keahlian, organisasi, hobi, prestasi }: CreateProfilBodyProps = body
        
        const dataDiriCreated = await db.Data_Diri.create({
            data: {
                name: name,
                email: email,
                no_hp: no_hp,
                alamat: alamat,
                jenis_kelamin: jenis_kelamin,
                tempat_lahir: tempat_lahir,
                tanggal_lahir: tanggal_lahir,
                jurusan: jurusan,
                pendidikan_terakhir: pendidikan_terakhir,
                tahun_lulus: tahun_lulus,
                pengalaman_kerja: pengalaman_kerja,
                minat: minat,
                keahlian: keahlian,
                organisasi: organisasi,
                hobi: hobi,
                prestasi: prestasi,
            }
        })

        return NextResponse.json({ data_diri: dataDiriCreated, message: "data diri created" }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
    
    