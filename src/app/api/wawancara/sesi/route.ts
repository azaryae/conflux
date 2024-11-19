import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user?.id) {
			throw new Error("Unauthorized access. Please log in.");
		}

		const id = Number(session.user.id);

		const data_wawancara = await db.data_Wawancara.findFirst({
			where: { user_id: id },
			orderBy: { created_at: "desc" },
		});

		if (!data_wawancara) {
			throw new Error("Data wawancara not found");
		}

		const questionAnswers = await req.json();

		console.log("Received questionAnswers:", questionAnswers);

		if (!Array.isArray(questionAnswers) || questionAnswers.length === 0) {
			throw new Error("Invalid questionAnswers format");
		}

		// Initialize Gemini AI
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);
		const model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash",
		});

		// Save questions and answers in the database
		for (const qa of questionAnswers) {
			if (!qa.question || !qa.answer) {
				throw new Error(
					"Each questionAnswer must have a question and an answer"
				);
			}

			// Generate suggestion using Gemini AI
			const prompt = `
            You are an professional HR interviewer. Based on this interview question and answer, 
            provide a brief, constructive suggestion for improvement in Indonesian language (Bahasa Indonesia).
            Keep the suggestion concise, within 2-3 sentences.
            
            Question: "${qa.question}"
            Answer: "${qa.answer}"
            `;

			const response = await model.generateContent(prompt);
			const suggestion = await response.response.text();

			await db.wawancara.create({
				data: {
					pertanyaan: qa.question,
					jawaban: qa.answer,
					saran: suggestion,
					durasi: "1",
					data_wawancara_id: data_wawancara.id,
				},
			});
		}

		const result = data_wawancara.id;

		return NextResponse.json({ result }, { status: 200 });
	} catch (error: any) {
		console.error("Error saving interview data:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
