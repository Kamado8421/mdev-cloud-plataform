import { prisma } from "@src/constants/vars";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const res = await prisma.user.count();

        const infos = {
            totalUsers: res
        }

        return Response.json(infos, {status: 200})

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}