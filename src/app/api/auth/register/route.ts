import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

interface CreateUserBodyProps {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, password }: CreateUserBodyProps = body

        // Form data checking and password length checking
        if (!name || !email) {
            return NextResponse.json({ error: "field username, name, and email is required" }, { status: 400 })
        }

        // Check if the email is valid
        const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail: boolean = regEx.test(email);
        if (!isValidEmail) {
            return NextResponse.json({ error: "invalid email" }, { status: 400 })
        }

        // Check password length
        if (password.length < 8) {
            return NextResponse.json({ error: "password minimum length is 8" }, { status: 400 })
        }

        // Find the user
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        })

        // Check if user already exists or not
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const userCreated = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        })

        // console.log(body)
        return NextResponse.json({ user: userCreated, message: "user created" }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

