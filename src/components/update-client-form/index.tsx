// import DataClientType from "@src/interfaces/data-clients.interface";
// import Button from "../button";

// export default function UpdateClientForm({ data, exit }: { data: DataClientType, exit: (v: any) => void }) {
//     return (
//         <div className="w-full">
//             <h1 className="mt-5 font-bold mb-2 text-white text-2xl">Atualizar Client</h1>
//             <span className="text-white font-semibold mb-5">JID: {data.jid}</span>
//             <form action="#" className="mt-5">
//                 <input type="text"
//                     placeholder="Username"
//                     className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e] mr-2"
//                 />
//                 <input type="text"
//                     placeholder="Level"
//                     className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e]"
//                 />
//                 <input type="text"
//                     placeholder="Level"
//                     className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e]"
//                 />

//                 <br /><br />

//                 <div>
//                     <Button
//                         styles={{ width: '30%', backgroundColor: 'red' }}
//                         onClick={() => exit(null)}
//                         title="Cancelar"

//                     />
//                     <Button
//                         styles={{ width: '30%', marginLeft: 10 }}
//                         onClick={() => exit(null)}
//                         title="Salvar"
//                         gradient
//                     />
//                 </div>
//             </form>
//         </div>
//     )
// }

'use client';

import { useState } from "react";
import DataClientType from "@src/interfaces/data-clients.interface";
import Button from "../button";
import { useAuth } from "@src/contexts/AuthContext";

interface Props {
    data: DataClientType;
    exit: (v: any) => void;
}

export default function UpdateClientForm({ data, exit }: Props) {

    const { setScreenMsg, user } = useAuth()

    const [username, setUsername] = useState(data.name || "");
    const [level, setLevel] = useState(data.level || "");
    const [xp, setXp] = useState(data.xp || 0);
    const [money, setMoney] = useState(data.money || 0);
    const [isPremium, setIsPremium] = useState(data.isPremium || false);
    const [isWoner, setIsWoner] = useState(data.isWoner || false);
    const [isBaned, setIsBaned] = useState(data.isBaned || false);

    const handleSave = async () => {
        const updatedData = {
            name: username,
            level,
            xp,
            money,
            isPremium,
            isWoner,
            isBaned,
            jid: data.jid,
        };


        const res = await fetch(`/api/data-cloud/clients`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                db_key: user?.id,
                jid: updatedData.jid,
                updates: {
                    ...updatedData
                }
            }),
        })

        if (res.ok) {
            setScreenMsg({
                type: 'success',
                message: 'Client atualizado com sucesso! Recarregue a página.'
            })
        } else {
            setScreenMsg({
                type: 'error',
                message: 'Erro ao atualizar o client'
            })
        }


        exit(updatedData);
    };

    return (
        <div className="w-full">
            <h1 className="mt-5 font-bold mb-2 text-white text-2xl">Atualizar Client</h1>
            <span className="text-white font-semibold mb-5">JID: {data.jid}</span>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
                className="mt-5"
            >
                {/* Username */}
                <label htmlFor="#" className="text-white font-semibold">Nome de Usuário</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e] mb-2 w-full"
                />

                {/* Level */}
                <label htmlFor="#" className="text-white font-semibold">Novo Level</label>
                <input
                    type="text"
                    placeholder="Level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e] mb-2 w-full"
                />

                {/* XP */}
                <label htmlFor="#" className="text-white font-semibold">Número de XP</label>
                <input
                    type="number"
                    placeholder="XP"
                    value={xp}
                    onChange={(e) => setXp(Number(e.target.value))}
                    className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e] mb-2 w-full"
                />

                {/* Money */}
                <label htmlFor="#" className="text-white font-semibold">Valor de Dinheiro</label>
                <input
                    type="number"
                    placeholder="Money"
                    value={money}
                    onChange={(e) => setMoney(Number(e.target.value))}
                    className="bg-[#ffffff59] outline-none border-2 rounded-md p-2 placeholder-[#0000008e] mb-2 w-full"
                />

                {/* Boolean fields */}
                <div className="mb-2">
                    <span className="text-white mr-2">Premium:</span>
                    <label className="mr-2">
                        <input
                            type="radio"
                            name="isPremium"
                            checked={isPremium === true}
                            onChange={() => setIsPremium(true)}
                        />
                        Sim
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isPremium"
                            checked={isPremium === false}
                            onChange={() => setIsPremium(false)}
                        />
                        Não
                    </label>
                </div>

                <div className="mb-2">
                    <span className="text-white mr-2">Woner:</span>
                    <label className="mr-2">
                        <input
                            type="radio"
                            name="isWoner"
                            checked={isWoner === true}
                            onChange={() => setIsWoner(true)}
                        />
                        Sim
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isWoner"
                            checked={isWoner === false}
                            onChange={() => setIsWoner(false)}
                        />
                        Não
                    </label>
                </div>

                <div className="mb-5">
                    <span className="text-white mr-2">Baned:</span>
                    <label className="mr-2">
                        <input
                            type="radio"
                            name="isBaned"
                            checked={isBaned === true}
                            onChange={() => setIsBaned(true)}
                        />
                        Sim
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="isBaned"
                            checked={isBaned === false}
                            onChange={() => setIsBaned(false)}
                        />
                        Não
                    </label>
                </div>

                {/* Buttons */}
                <div className="flex">
                    <Button
                        styles={{ width: "30%", backgroundColor: "red" }}
                        onClick={() => exit(null)}
                        title="Cancelar"
                    />
                    <Button
                        onClick={() => { }}
                        styles={{ width: "30%", marginLeft: 10 }}
                        title="Salvar"
                        gradient
                    />
                </div>
            </form>
            <br /><br /><br />
        </div>
    );
}
