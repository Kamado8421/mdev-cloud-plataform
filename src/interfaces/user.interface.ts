interface UserType {
    id: string
    email: string
    username: string
    createdAt?: string
    hasDataClient: boolean
    dataLimit: number
}

export default UserType;
