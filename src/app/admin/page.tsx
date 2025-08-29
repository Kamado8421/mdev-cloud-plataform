'use client';
import Button from "@src/components/button";
import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";
import { useAuth } from "@src/contexts/AuthContext";
import { useEffect, useState } from "react"

function Form({ setAuthorized }: { setAuthorized: (v: boolean) => void }) {

    const { setScreenMsg, router, setIsLoading } = useAuth();
    const [password, setPassword] = useState('');

    const authenticateAdmin = async () => {
        if (!password) return setScreenMsg({
            type: 'warning',
            message: 'Insira a chave de acesso.'
        })

        setIsLoading(true);
        const res = await fetch('/api/auth/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                auth_code: NEXT_PUBLIC_SECRET_KEY
            })
        })

        if (!res.ok) {
            setIsLoading(false)
            setScreenMsg({
                type: 'error',
                message: 'Não autorizado.'
            })
            router.push('/login');
            return;
        }
        setIsLoading(false)
        setAuthorized(true);
        setScreenMsg({
            type: 'success',
            message: 'Bem-vindo, Admin'
        })
    }

    return (
        <div className="flex items-center justify-center h-full flex-col">
            <div className="md:w-[50%] w-[90%] mt-20">
                <h1 className="text-white font-bold text-2xl mb-3">M{"'"}Dev Cloud</h1>
                <input
                    type="password"
                    placeholder="Chave de Acesso"
                    className="w-full p-2.5 rounded-md bg-[#2c3e73] text-white"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br /><br />
                <Button
                    onClick={authenticateAdmin}
                    title="Entrar"
                />
            </div>
        </div>
    )
}

export default function AdminPage() {

    const [authorized, setAuthorized] = useState(false);
    const [infos, setInfos] = useState<{
        totalUsers: number
    } | null>(null);
    const { setScreenMsg } = useAuth();

    useEffect(() => {
        const getInfo = async () => {
            if (authorized) {
                const res = await fetch('/api/auth/admin/infos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                if (!res.ok) {
                    setInfos(null);
                    setScreenMsg({
                        type: 'warning',
                        message: 'Atualize a página para carregar os dados novamente.'
                    })
                }

                const info = await res.json();
                setInfos(info)

            }
        }

        getInfo();

    }, [authorized]);

    if (!authorized) return <Form setAuthorized={setAuthorized} />

    return (
        <div className="md:p-10 p-5">
            <h1 className="text-3xl text-white font-bold">Dashboard Admin</h1>
            <br /><br />
            <p className="text-white">Informações:</p>
            <br /><br />
            <div className="p-4 rounded-md bg-[#ffffff31] flex items-center justify-between mb-5">
                <span className="font-semibold text-white">Usuários:</span>
                <span className="text-white">{infos?.totalUsers}</span>
            </div>
            <div className="p-4 rounded-md bg-[#ffffff31] flex items-center justify-between mb-5">
                <span className="font-semibold text-white">Total de Requisições:</span>
                <span className="text-white">{infos?.totalUsers}</span>
            </div>

        </div>
    )
}