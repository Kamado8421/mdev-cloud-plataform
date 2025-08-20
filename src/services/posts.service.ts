import api from "./api";

export async function createNewUser(data: { email: string; password: string; username: string }) {

    console.log(data)

    const result = await api.post('/db-manager/users', data);

    console.log(result)
    return result.data;
}

