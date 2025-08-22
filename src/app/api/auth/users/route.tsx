import { PrismaClient } from "@prisma/client";
import { validateAuthCode } from "@src/utils/funcs";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { id, auth_code }: { id: string; auth_code: string } = await req.json();

        console.log({auth_code})

        if (!validateAuthCode(auth_code)) {
            return Response.json({ error: "Autorização negada" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return Response.json({ error: "User not Found" }, { status: 404 });
        }

        return Response.json({ user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
