"use client";

import Button from "@src/components/button";
import DataTable from "@src/components/data-table";
import Navbar from "@src/components/navbar";
import { useAuth } from "@src/contexts/AuthContext";
import DataClientType from "@src/interfaces/data-clients.interface";
import { getDataClients } from "@src/services/gets.service";
import { use, useEffect, useState } from "react";

export default function DashboardPage() {

    const { user } = useAuth();
    const [clientsDB, setClientsDB] = useState<DataClientType[]>([]);

    useEffect(() => {
        // if (!user) {
        //     location.href = '/login';
        // }

        const fetchDataClients = async () => {
            const data = await getDataClients();
            //setClientsDB(data);
            setClientsDB([
                { id: "1", jid: "jid1", name: "User One", isPremium: true, isWoner: true, isBaned: false, level: "5", xp: 1500, money: 100, createdAt: "2023-10-01T12:00:00Z", idDataWorner: "owner1" },
                { id: "2", jid: "jid2", name: "User One", isPremium: true, isWoner: true, isBaned: false, level: "5", xp: 1500, money: 100, createdAt: "2023-10-01T12:00:00Z", idDataWorner: "owner1" },
                { id: "3", jid: "jid3sssssssssssssss", name: "User One", isPremium: true, isWoner: true, isBaned: false, level: "5", xp: 1500, money: 100, createdAt: "2023-10-01T12:00:00Z", idDataWorner: "owner1" },
                { id: "4", jid: "jdid3", name: "User One", isPremium: true, isWoner: true, isBaned: false, level: "5", xp: 1500, money: 100, createdAt: "2023-10-01T12:00:00Z", idDataWorner: "owner1" },
            ])
        }

        fetchDataClients();

    }, [clientsDB]);

    return (
        <div>
            <Navbar content="dashboard" />

            <main className=" p-5 md:p-10 flex flex-col md:items-start items-center h-full w-full">
                <h1 className="text-white text-4xl font-bold">Banco de Dados {user?.email}</h1>
                {user?.hasDataClient && <div>
                    <p className="text-white mt-5 md:text-left text-center md:text-[18px] text-[16px]">Clique abaixo para começar a usar seu banco de dados. Será liberado um limite de<br className="md:flex hidden" />registros gratuitos para você.</p>
                    <Button
                        tailwind="mt-5"
                        gradient
                        onClick={() => { }}
                        title="Criar seu Banco de Dados"
                    />
                </div>}

                {!user?.hasDataClient ? (<div className="w-full scroll">
                    <div className="flex gap-5 flex-col md:w-[30%]">
                        <div className="w-full flex justify-between text-white font-semibold mt-10">
                            <span>Seu limite</span>
                            <span>0/10</span>
                        </div>
                        <div className="flex mt-[-10px] flex-row  rounded-md bg-[#2c3e73] p-3 items-center justify-between text-white font-semibold">
                            <span className="font-bold">DB_KEY:</span>********************
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
                                            alert("Erro ao copiar.");
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