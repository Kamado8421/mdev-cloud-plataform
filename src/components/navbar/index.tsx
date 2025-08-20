"use client";

import Image from "next/image";
import Logo from '@src/assets/logo.svg';
import { BotIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@src/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
    content?: 'index' | 'dashboard',
    style?: React.CSSProperties;
};

function NavbarContentIndex() {
    return (
        <div className="flex items-center justify-between gap-[10px] text-[14px]">
            <button
                onClick={() => { location.href = '/register' }}
                className="p-2 pl-5 pr-5 border-2 border-[#b603ff] rounded-md text-white click-point md:flex hidden">
                CRIAR CONTA
            </button>
            <button
                onClick={() => { location.href = '/login' }}
                className="bg-tag p-2 pl-5 pr-5 rounded-md click-point">
                ENTRAR
            </button>
        </div>
    )
}
// function NavbarContentDashboard() {

//     const [mobileScreen, setMobileScreen] = useState(false);
//     const [showMenu, setShowMenu] = useState(false);
//     const { logout } = useAuth();
//     const router = useRouter();

//     return (
//         <div className="flex items-center justify-between gap-[10px] text-white flex-col-reverse md:flex-row">

//             {!mobileScreen && <>
//                 <a className="hover:text-[#b603ff]" href="#">API - Documentação</a>
//                 <a className="hover:text-[#b603ff] flex items-center gap-1" href="#"><BotIcon /> <span>Suporte</span></a>
//                 <span className="font-bold"><span className="tag">$0</span> Dev-Coins</span>
//                 <button onClick={() => {
//                     const exit = confirm('Realmente deseja sair?');

//                     if (exit) {
//                         logout();
//                         router.push('/login')
//                     }
//                 }} className="tag-hover"><LogOutIcon /></button>
//             </>}

//             <MenuIcon className="tag-hover click-point md:hidden flex" />


//         </div>
//     )
// }

function NavbarContentDashboard() {
  const [mobileScreen, setMobileScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkScreen = () => setMobileScreen(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleLogout = () => {
    const exit = confirm('Realmente deseja sair?');
    if (exit) {
      logout();
      router.push('/login');
    }
  };

  return (
    <div className="flex items-center justify-between gap-[10px] text-white flex-col-reverse md:flex-row">
      
      {/* Itens normais para desktop */}
      {!mobileScreen && (
        <>
          <a className="hover:text-[#b603ff]" href="#">API - Documentação</a>
          <a className="hover:text-[#b603ff] flex items-center gap-1" href="#">
            <BotIcon /> <span>Suporte</span>
          </a>
          <span className="font-bold"><span className="tag">$0</span> Dev-Coins</span>
          <button onClick={handleLogout} className="tag-hover"><LogOutIcon /></button>
        </>
      )}

      {/* Ícone do menu no mobile */}
      {mobileScreen && (
        <MenuIcon
          onClick={() => setShowMenu(!showMenu)}
          className="tag-hover click-point md:hidden flex cursor-pointer"
        />
      )}

      {/* Menu lateral para mobile */}
      {mobileScreen && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 
                      ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col p-5 gap-5 text-white">
            <button onClick={() => setShowMenu(false)} className="self-end text-gray-400 hover:text-white">
              ✕
            </button>
            <a className="hover:text-[#b603ff]" href="#">API - Documentação</a>
            <a className="hover:text-[#b603ff] flex items-center gap-1" href="#">
              <BotIcon /> <span>Suporte</span>
            </a>
            <span className="font-bold"><span className="tag">$0</span> Dev-Coins</span>
            <button onClick={handleLogout} className="tag-hover"><LogOutIcon /></button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function Navbar({ content, style }: Props) {
    return (
        <div style={style} className="flex items-center justify-between p-5">
            <button onClick={() => location.href = content === 'dashboard' ? '/dashboard' : '/'} className="flex gap-2 items-center">
                <Image src={Logo} alt="Logo" width={50} height={50} />
                <h1 className="font-bold text-white text-1xl md:text-2xl">M'DEV SYSTEMS</h1>
            </button>

            {content === 'index' && <NavbarContentIndex />}
            {content === 'dashboard' && <NavbarContentDashboard />}

        </div>
    )
}