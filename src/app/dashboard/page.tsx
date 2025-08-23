"use client";

import Button from "@src/components/button";
import DataTable from "@src/components/data-table";
import Navbar from "@src/components/navbar";
import DataClientType from "@src/interfaces/data-clients.interface";
import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";
import { useAuth } from "@src/contexts/AuthContext";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {

    const { user, setIsLoading, setUser, setScreenMsg } = useAuth();
    const [clientsDB, setClientsDB] = useState<DataClientType[]>([]);

    async function createClound() {
        if (user?.hasDataClient) return setScreenMsg({
            type: 'warning',
            message: 'Essa ação já foi realizada. Por favor, atualize a página.'
        })

        console.log(user)

        setIsLoading(true)

        const res = await fetch('/api/data-cloud/plataform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user?.id,
                auth_code: NEXT_PUBLIC_SECRET_KEY
            }),
        })

        if (res.ok) {
            setScreenMsg({
                type: 'success',
                message: 'Banco de dados criado com sucesso!!'
            })

            if (user) {
                setUser({ ...user, hasDataClient: true });
            }
        } else {
            setScreenMsg({
                type: 'error',
                message: 'Ocorreu algum erro interno ao solicitar esse serviço!'
            })
        }

        setIsLoading(false);
    }

    return (
        <div>
            <Navbar content="dashboard" />

            <main className=" p-5 md:p-10 flex flex-col md:items-start items-center h-full w-full">
                <h1 className="text-white text-4xl font-bold">Banco de Dados</h1>
                {!user?.hasDataClient && <div>
                    <p className="text-white mt-5 md:text-left text-center md:text-[18px] text-[16px]">Clique abaixo para começar a usar seu banco de dados. Será liberado um limite de<br className="md:flex hidden" />registros gratuitos para você.</p>
                    <Button
                        tailwind="mt-5"
                        gradient
                        onClick={createClound}
                        title="Criar seu Banco de Dados"
                    />
                </div>}

                {user?.hasDataClient ? (<div className="w-full scroll">
                    <div className="flex gap-5 flex-col md:w-[35%]">
                        <div className="w-full flex justify-between text-white font-semibold mt-10">
                            <span>Seu limite</span>
                            <span>0/10</span>
                        </div>
                        <div className="flex mt-[-10px] flex-row  rounded-md bg-[#2c3e73] p-3 items-center justify-between text-white font-semibold">
                            <span className="font-bold">DB_KEY:</span><span className="text-[12px]">{user?.id}</span>
                            <Button
                                title="copy"
                                styles={{ width: 100 }}
                                gradient
                                onClick={() => {
                                    navigator.clipboard.writeText("helloword")
                                        .then(() => {
                                            alert("Texto copiado com sucesso!");
                                        })
                                        .catch((err) => {
                                            alert("Erro ao copiar." + err);
                                        });
                                }} />
                        </div>
                    </div>
                    <DataTable data={clientsDB} />
                </div>) : <div className="text-[#adadad] mt-10">Dados não encontrados. Por favor, se possui dados, atualize a página.</div>}
            </main>
        </div>
    )
}