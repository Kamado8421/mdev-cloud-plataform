import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";

const prisma = new PrismaClient();

interface LoginReqProps {
  email: string;
  password: string;
  auth_code: string;
}


function validateAuthCode(auth_code: string) {
  return NEXT_PUBLIC_SECRET_KEY === auth_code;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginReqProps = await req.json();
    const { auth_code, email, password } = body;

    // 1. valida auth_code
    if (!validateAuthCode(auth_code)) {
      return Response.json(
        { error: "Autorização negada" },
        { status: 401 }
      );
    }
    
    // 2. verifica usuário pelo email
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });

    // 3. compara senha
    const isValidePassword = await bcrypt.compare(password, existingUser?.password || '');
    if (!existingUser || !isValidePassword) {
      return Response.json(
        { error: "E-mail ou senha inválidos" },
        { status: 401 }
      );
    }

    // 4. gera JWT
    const payload = {
      email: existingUser.email,
      username: existingUser.username
    };
    const secretKey = JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // 5. retorna usuário (sem senha)
    const { password: _, ...userWithoutPassword } = existingUser;

    return Response.json(
      {
        message: "Login bem-sucedido",
        user: userWithoutPassword,
        token
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
