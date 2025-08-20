'use client';

import Button from "@src/components/button";
import Loading from "@src/components/loading";
import Navbar from "@src/components/navbar";
import { useAuth } from "@src/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const { setIsLoading, isLoading, login, user, screenMsg, setScreenMsg } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) location.href = '/dashboard';
    }, [user]);

    async function onLogin() {
        setIsLoading(true);
        if (!email || !password) {
            setIsLoading(false);
            return setScreenMsg({
                type: 'warning',
                message: 'Preencha todos os campos.'
            })
        }
        login({ email, password });
        setIsLoading(false);
    }

    return (
        <div className="h-full">
            {isLoading && <Loading />}
            <Navbar style={{ position: 'fixed', top: 0 }} />
            <main className="h-full w-full items-center flex flex-1 justify-center">
                <div className="bg-[#1f2f5d] border-[2px] border-[#fff] pt-10 pl-5 pr-5 pb-10 rounded-[10px] flex flex-col gap-2.5 items-center w-[90%] md:w-[30%]">
                    <span className="text-white text-[20px] font-semibold p-5">Entre em sua conta</span>

                    <input
                        type="email"
                        placeholder="E-mail"
                        className="w-full p-2.5 rounded-md bg-[#2c3e73] text-white"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full p-2.5 rounded-md bg-[#2c3e73] text-white"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <a href="/register" className="text-[14px] text-[#7b7b7b] p-2">
                        Não possui uma conta? <span className="tag">Clique aqui.</span>
                    </a>

                    <Button
                        onClick={onLogin}
                        title="Entrar agora"
                        gradient
                    />
                </div>
            </main>
        </div>
    )
}
