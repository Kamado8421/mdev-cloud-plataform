export default interface DataClientType {
    id: string;
    jid: string;
    name: string;
    isPremium: boolean;
    isWoner: boolean;
    isBaned: boolean;
    level?: string;
    xp: number;
    money: number;
    createdAt: string;
}
