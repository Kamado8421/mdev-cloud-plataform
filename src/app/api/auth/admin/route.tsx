import { prisma } from "@src/constants/vars";
import { validateAuthCode } from "@src/utils/funcs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: { password: string, auth_code: string } = await req.json();
        const { auth_code, password } = body;

        // 1. valida auth_code
        if (!validateAuthCode(auth_code)) {
            return Response.json(
                { error: "Autorização negada" },
                { status: 401 }
            );
        }

        // 2. verifica usuário pelo email
        const hasAdmin = await prisma.admin.findFirst({
            where: { password }
        });

        if (!hasAdmin) return Response.json({ error: 'Não autorizado' }, { status: 401 })

        return Response.json({ authorized: true }, { status: 200 })

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}

