import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";

export function validateAuthCode(auth_code: string) {
  return NEXT_PUBLIC_SECRET_KEY === auth_code;
}
