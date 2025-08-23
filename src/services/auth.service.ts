import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";
import { getUserId } from "./jwt.service";

export async function getLocalUser() {
    const userId = getUserId();
    if (!userId) return null;
    
    const url = `/api/data-cloud/plataform/users?auth_code=${NEXT_PUBLIC_SECRET_KEY}&userId=${userId}`
    const res = await fetch(url, {
        method: 'GET',
    })

    if(res.ok){
        const result = await res.json();

        return result.user;
    }

    return null
}
