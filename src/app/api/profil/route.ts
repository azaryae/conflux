import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface CreateProfilBodyProps {
  email: string;
  no_hp: string;
  alamat: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jurusan: string;
  pendidikan_terakhir: string;
  tahun_lulus: string;
  pengalaman_kerja: string;
  minat: string;
  keahlian: string;
  organisasi: string;
  hobi: string;
  prestasi: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user_id = session?.user?.id;

    if (!user_id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Ensure user_id is an integer
    const userIdInt = parseInt(user_id as string, 10);
    
    // Check if the userIdInt is a valid number
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { error: "Invalid user ID." },
        { status: 400 }
      );
    }

    const body = (await req.json()) as CreateProfilBodyProps;

    const {
      email,
      no_hp,
      alamat,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      jurusan,
      pendidikan_terakhir,
      tahun_lulus,
      pengalaman_kerja,
      minat,
      keahlian,
      organisasi,
      hobi,
      prestasi,
    } = body;

    const dataDiriCreated = await db.data_Diri.create({
      data: {
        email,
        no_hp,
        alamat,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        jurusan,
        pendidikan_terakhir,
        tahun_lulus,
        pengalaman_kerja,
        minat,
        keahlian,
        organisasi,
        hobi,
        prestasi,
        user_id: userIdInt,  // Use the integer value for user_id
      },
    });

    return NextResponse.json(
      { data_diri: dataDiriCreated, message: "Data diri berhasil dibuat" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating data:", error.message);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
