import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const id = Number(session?.user?.id);

        
		const data_wawancara = await db.data_Wawancara.findFirst({
			where: { user_id: id },
			orderBy: { created_at: "desc" },
		});

        if (!data_wawancara) {
            throw new Error("Data wawancara not found");
        }

		const { questionAnswers } = await req.json();

        for (const qa of questionAnswers) {
            await db.wawancara.create({
                data: {
                    pertanyaan: qa.question,
                    jawaban: qa.answer,
                    data_wawancara_id: data_wawancara.id,
                },
            });
        }
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
