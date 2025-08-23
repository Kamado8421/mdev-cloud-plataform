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

      //const { userId, ...rest } = data;
      return Response.json({ ...data, userId: undefined }, { status: 200 });
    }

    const data = await prisma.dataClient.findMany({ where: { userId: db_key } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return Response.json({...data, userId: undefined}, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

type UpdateKeysBodyProps = {
  jid: string;
  db_key: string;
  updates: {
    username?: string;
    isPremium?: boolean | string;
    isBaned?: boolean | string;
    level?: string | number;
    xp?: number | string;
    money?: number | string;
    name?: string;
  }
};

export async function PUT(req: NextRequest) {
  try {
    const body: UpdateKeysBodyProps = await req.json();
    const { jid, db_key } = body;

    console.log(body)

    if (!db_key) {
      return Response.json({ error: "DB-Key Obrigatório" }, { status: 401 });
    }

    const isValidated = await validateDBKey(db_key);
    if (!isValidated) {
      return Response.json({ error: "DB-Key inválido" }, { status: 401 });
    }

    if (!jid) {
      return Response.json({ error: "jid Obrigatório" }, { status: 401 });
    }

    const existing = await prisma.dataClient.findUnique({ where: { jid } });
    if (!existing) {
      return Response.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    // Campos permitidos para atualização
    const allowedFields = [
      "isPremium",
      "isBaned",
      "level",
      "xp",
      "money",
      "name",
      "username"
    ];

    // Tipar como Record<string, any> para permitir atribuições dinâmicas
    const data: Record<string, any> = {};
    const updates = body.updates;

    for (const key of allowedFields) {
      if (updates.hasOwnProperty(key)) {
        const value = updates[key as keyof UpdateKeysBodyProps['updates']];

        switch (key) {
          case "isPremium":     
            data[key] =
              typeof value === 'string'
                ? value.toLowerCase() === 'true'
                : Boolean(value);
          case "isBaned":
            data[key] =
              typeof value === 'string'
                ? value.toLowerCase() === 'true'
                : Boolean(value);
          case "xp":
            const xp = Number(value);
            if (!isNaN(xp)) data.xp = xp;
            break;

          case "money":
            const money = Number(value);
            if (!isNaN(money)) data.money = money;
            break;

          case "level":
            data.level = String(value);
            break;

          case "name":
          case "username":
            data.name = String(value);
            break;
        }
      }
    }

    if (Object.keys(data).length === 0) {
      return Response.json(
        { error: "Nenhum campo válido fornecido para atualização." },
        { status: 400 }
      );
    }

    const updated = await prisma.dataClient.update({
      where: { jid },
      data,
    });

    return Response.json(
      {
        success: true,
        message: "Cliente atualizado com sucesso.",
        client: {...updated, userId: undefined},
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 });
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


