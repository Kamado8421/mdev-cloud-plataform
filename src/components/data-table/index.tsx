import DataClientType from "@src/interfaces/data-clients.interface";
import Button from "../button";

interface Props {
    data: DataClientType[];
}

export default function DataTable({ data }: Props) {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-sm text-left text-white border border-purple-700 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900">
                    <tr>
                        <th className="px-4 py-3 text-center">#</th>
                        <th className="px-4 py-3 text-center">JID</th>
                        <th className="px-4 py-3 text-center">Nome</th>
                        <th className="px-4 py-3 text-center">Premium</th>
                        <th className="px-4 py-3 text-center">Dono</th>
                        <th className="px-4 py-3 text-center">Banido</th>
                        <th className="px-4 py-3 text-center">Level</th>
                        <th className="px-4 py-3 text-center">XP</th>
                        <th className="px-4 py-3 text-center">Moedas</th>
                        <th className="px-4 py-3 text-center">Criado em</th>
                        <th className="px-4 py-3 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950">
                    {data.map((client) => (
                        <tr
                            key={client.id}
                            className="border-b border-purple-800 hover:bg-purple-900/30 transition-colors"
                        >
                            <td className="px-4 py-2">{client.id}</td>
                            <td className="px-4 py-2">{client.jid}</td>
                            <td className="px-4 py-2">{client.name}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full  text-center ${client.isPremium ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                            </td>
                            <td className="px-4 py-2">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full ${client.isWoner ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                            </td>
                            <td className="px-4 py-2">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full ${client.isBaned ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                            </td>
                            <td className="px-4 py-2">{client.level ?? "-"}</td>
                            <td className="px-4 py-2">{client.xp}</td>
                            <td className="px-4 py-2">{client.money}</td>
                            <td className="px-4 py-2">
                                {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                            </td>
                            <td className="flex gap-2.5 items-center p-2">
                                <Button tailwind="bg-[blue] text-[10px]" onClick={() => {}} title="EDITAR"/>
                                <Button tailwind="bg-[red]  text-[10px]" onClick={() => {}} title="EXCLUIR"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


