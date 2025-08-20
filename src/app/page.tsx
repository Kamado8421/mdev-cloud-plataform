'use client';

import Button from "@src/components/button";
import Navbar from "@src/components/navbar";
import Image from "next/image";

import Logo from '@src/assets/logo.svg'

export default function App() {
  return (
    <div>
      <Navbar content="index" />

      <main className="flex flex-col md:items-start md:p-20 p-5 items-center h-full w-full">

        <Image src={Logo} alt="Logo" className="md:hidden flex h-[270px] w-[250px] mt-10" />

        <h1 className="md:text-7xl font-bold text-5xl mb-8 text-white mt-5">M'DEV Cloud</h1>
        <p className="md:text-left text-center md:text-[18px] text-white">
          Cançado de usar arquivos JSON nos seus projetos de Bots
          ou até mesmo têm <br className="md:flex hidden" /> dificuldades de usar essa solução? Conheça
          agora nossa API de banco de <br className="md:flex hidden" /> dados para registro e gerenciamento
          de seus usuários!!
        </p>

        <Button
          onClick={() => { location.href = '/register' }}
          gradient
          tailwind="mt-8 md:w-[45%] p-4"
          title="Criar conta Grátis" />

      </main>

    </div>
  );
}
