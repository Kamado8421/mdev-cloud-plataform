import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

let contador = 0;
export function incrementarContador() {
    contador++;
    console.log(`Contador incrementado: ${contador}`);
}

export function getContador() {
    return contador;
}