import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Question {
	question: string;
}

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const id = Number(session?.user?.id);

		const user = await db.user.findUnique({
			where: { id },
			include: { data_diri: true },
		});

		if (!user) {
			throw new Error("User not found");
		}

		const data_wawancara = await db.data_Wawancara.findFirst({
			where: { user_id: id },
			orderBy: { created_at: "desc" },
		});

		if (!data_wawancara) {
			throw new Error("Data wawancara not found");
		}

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);
		const model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash",
		});

		const prompt = `generate pertanyaan interview/wawancara dalam bahasa indonesia sebanyak 10 pertanyaan berdasarkan pengguna ${JSON.stringify(
			user
		)} dan data wawancara ${JSON.stringify(
			data_wawancara
		)}. Format the output as an array with no additional styling, e.g., ["question 1", "question 2", ...]`;

		const response: any = await model.generateContent(prompt);
		const result: Question[] = response.response.text();
		console.log(result);

		return NextResponse.json({ result }, { status: 201 });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
