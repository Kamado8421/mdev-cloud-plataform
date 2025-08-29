import { prisma } from "@src/constants/vars";
import { validateAuthCode } from "@src/utils/funcs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const auth_code = searchParams.get("auth_code");
        const userId = searchParams.get("userId");

        if (!auth_code || !userId) {
            return Response.json({ error: 'Acesso negado' }, { status: 401 });
        } 

        if(!validateAuthCode(auth_code)){
            return Response.json({ error: 'Acesso negado' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            return Response.json({ error: 'Registro não encontrado' }, { status: 404 });
        }

        return Response.json({ user: { ...user, password: undefined } }, { status: 200 });


    } catch (error) {
        console.log(error)
    }
}