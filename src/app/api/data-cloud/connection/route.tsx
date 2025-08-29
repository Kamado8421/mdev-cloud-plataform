import { prisma } from "@src/constants/vars";
import { validateDBKey } from "@src/utils/funcs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const db_key = searchParams.get("db_key");

        if (!db_key) {
            return Response.json({ error: 'DB-Key Obrigatório' }, { status: 401 });
        }

        const isValidated = await validateDBKey(db_key);

        const res = {
            wasConnected: !!isValidated,
            message: isValidated ? 'Conexão estabelecida & autorizada com sucesso!' : 'Conexão negada. Verifique sua DB-Key',
        }


        return Response.json(res, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Erro interno no servidor' }, { status: 500 });
    }
}