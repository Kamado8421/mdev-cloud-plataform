import { prisma } from "@src/constants/vars";
import { getDataClientByJid, validateDBKey } from "@src/utils/funcs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const jid = searchParams.get("jid");
    const db_key = searchParams.get("db_key");

    if (!db_key) {
      return Response.json({ error: 'DB-Key Obrigatório' }, { status: 401 });
    }

    const isValidated = await validateDBKey(db_key);
    if (!isValidated) {
      return Response.json({ error: 'DB-Key inválido' }, { status: 401 });
    }

    if (jid) {
      const data = await prisma.dataClient.findUnique({ where: { jid } });
      if (!data) return Response.json({}, { status: 404 });

      const { userId, ...rest } = data;
      return Response.json(rest, { status: 200 });
    }

    const data = await prisma.dataClient.findMany({ where: { userId: db_key } });
    const dataFormated = data.map(({ userId, ...rest }) => rest);

    return Response.json(dataFormated, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: { jid: string; db_key: string; username?: string } = await req.json();
    const { jid, db_key, username } = body;

    if (!db_key) {
      return Response.json({ error: 'DB-Key Obrigatório' }, { status: 401 });
    }

    const isValidated = await validateDBKey(db_key);
    if (!isValidated) {
      return Response.json({ error: 'DB-Key inválido' }, { status: 401 });
    }

    if (!jid) {
      return Response.json({ error: 'jid Obrigatório' }, { status: 401 });
    }

    const clientExists = await getDataClientByJid(jid);
    if (clientExists) {
      return Response.json({
        error: 'Cliente já existe',
        client: { ...clientExists }
      }, { status: 409 });
    }

    const data = await prisma.dataClient.create({
      data: {
        name: username || 'Anônimo(a)',
        jid,
        userId: db_key
      }
    });

    const { userId, ...rest } = data;
    return Response.json(rest, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const jid = searchParams.get("jid");
    const db_key = searchParams.get("db_key");

    if (!db_key) {
      return Response.json({ error: 'DB-Key Obrigatório' }, { status: 401 });
    }

    const isValidated = await validateDBKey(db_key);
    if (!isValidated) {
      return Response.json({ error: 'DB-Key inválido' }, { status: 401 });
    }

    if (!jid) {
      return Response.json({ error: 'jid Obrigatório' }, { status: 401 });
    }

    const clientExists = await getDataClientByJid(jid);
    if (!clientExists) {
      return Response.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    await prisma.dataClient.delete({ where: { jid } });
    return Response.json({ message: 'Cliente deletado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
