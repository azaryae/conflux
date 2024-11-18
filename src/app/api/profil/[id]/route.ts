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

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user_id = session?.user?.id;

    // Check if user is logged in
    if (!user_id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Parse user_id to integer
    const userIdInt = parseInt(user_id as string, 10);
    
    // Check if the userIdInt is a valid number
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { error: "Invalid user ID." },
        { status: 400 }
      );
    }

    const body = (await req.json()) as CreateProfilBodyProps;

    // Validate body fields
    const requiredFields = [
      "email", "no_hp", "alamat", "jenis_kelamin", "tempat_lahir", 
      "tanggal_lahir", "jurusan", "pendidikan_terakhir", "tahun_lulus", 
      "pengalaman_kerja", "minat", "keahlian", "organisasi", "hobi", "prestasi"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    // Destructure the request body
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

    // Check if data exists for the user before updating
    const existingData = await db.data_Diri.findUnique({
      where: { user_id: userIdInt },
    });

    if (!existingData) {
      return NextResponse.json(
        { error: "Data not found for the user." },
        { status: 404 }
      );
    }

    // Update the profile data in the database
    const dataDiriUpdated = await db.data_Diri.update({
      where: { user_id: userIdInt },
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
        user_id: userIdInt, 
      },
    });

    return NextResponse.json(
      { data_diri: dataDiriUpdated, message: "Data diri berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating data:", error.message);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui data diri. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
