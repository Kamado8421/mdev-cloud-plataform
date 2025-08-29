import { getContador, incrementarContador, prisma } from "@src/constants/vars";
import { getUserById, validateAuthCode } from "@src/utils/funcs";
import { NextRequest } from "next/server";


export function incrementarContadorLocal() {
    //   const valor = cache.get<number>("contador") || 0;
    //   console.log({ valor });
    //   cache.set("contador", valor + 1);
    incrementarContador();
}

export function getContadorLocal() {
    return getContador() //cache.get<number>("contador") || 0;
}

export async function POST(req: NextRequest) {
    try {

        const body: { auth_code: string, userId: string, newLimit: number } = await req.json();
        const { auth_code, userId, newLimit } = body;

        if (!auth_code || !userId) {
            return Response.json({ error: 'Acesso negado' }, { status: 401 });
        }

        if (!validateAuthCode(auth_code)) {
            return Response.json({ error: 'Acesso negado' }, { status: 401 });
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                dataLimit: newLimit
            }
        })

        return Response.json({ message: 'Limite atualizado com sucesso.' }, { status: 200 })

    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}