import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";

const prisma = new PrismaClient();

interface CreateuserReqProps {
  email: string;
  username: string;
  password: string;
  auth_code: string;
}

function validateAuthCode(auth_code: string) {
  return NEXT_PUBLIC_SECRET_KEY === auth_code;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateuserReqProps = await req.json();
    const { auth_code, email, password, username } = body;

    if (!validateAuthCode(auth_code)) {
      return Response.json(
        { error: "Autorização negada" },
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email }
        ]
      }
    });

    if (existingUser) {
      return Response.json(
        { error: "Já existe um usuário com esse email" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword
      }
    });

    return Response.json(
      { message: "Usuário criado com sucesso", user: {...user, password: undefined} },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
