import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";
import { prisma } from "@src/constants/vars";

export function validateAuthCode(auth_code: string) {
  return NEXT_PUBLIC_SECRET_KEY === auth_code;
}

export async function validateDBKey(db_key: string) {

  const user = await prisma.user.findUnique({
    where: {
      id: db_key
    }
  })

  return (user && user.hasDataClient);
}
export async function getUserById(db_key: string) {

  const user = await prisma.user.findUnique({
    where: {
      id: db_key
    }
  })

  return user;
}

export async function getDataClientByJid(jid: string) {

  const client = await prisma.dataClient.findUnique({
    where: {
      jid
    }
  })

  return client;
}


