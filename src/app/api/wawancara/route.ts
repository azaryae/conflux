import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
	try {
	const user_id = (await getServerSession(authOptions))?.user?.id;

        const { nama_instansi, deskripsi_instansi, posisi, deskripsi_posisi, tipe_pekerjaan, pengalaman_minimal, questionType } = await req.json();

        const result = await db.data_Wawancara.create({
			data: {
				nama_instansi,
				deskrpsi_instansi: deskripsi_instansi,
				posisi,
				deskripsi_posisi,
				tipe_pekerjaan,
				pengalaman_minimal,
				jenis_pertanyaan: questionType,
				user_id,
			},
		});

        return NextResponse.json(result, { status: 201 });

	} catch (error: any) {
        console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
