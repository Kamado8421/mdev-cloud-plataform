import { prisma } from "@src/constants/vars";
import { validateAuthCode } from "@src/utils/funcs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {

        console.log('Criando banco de dados...')

        const body: { auth_code: string, userId: string } = await req.json();
        const { auth_code, userId } = body;

        const authCodeValidated = validateAuthCode(auth_code);

        if (!userId && !auth_code && !authCodeValidated) {
            return Response.json({ error: "Acesso negado!" }, { status: 401 });
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasDataClient: true
            }
        })

        
        console.log('Finalizado')
        return Response.json({ message: 'Cloud criado com sucesso!'}, { status: 201 });

} catch (error) {
    console.error(error);
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 });
}
}