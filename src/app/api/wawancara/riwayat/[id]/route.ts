import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = parseInt(params.id, 10);
		if (isNaN(id)) {
			return NextResponse.json(
				{ error: "Invalid ID parameter" },
				{ status: 400 }
			);
		}

		const hasil = await db.data_Wawancara.findUnique({
			where: { id },
			include: { wawancara: true },
		});

		if (!hasil) {
			return NextResponse.json(
				{ error: `Data wawancara with ID ${id} not found.` },
				{ status: 404 }
			);
		}

		return NextResponse.json({ data: hasil }, { status: 200 });
	} catch (error: any) {
		console.error("Error fetching wawancara:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
