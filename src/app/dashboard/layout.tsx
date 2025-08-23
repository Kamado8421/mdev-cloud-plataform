'use client';

import { useAuth } from "@src/contexts/AuthContext"
import { getLocalUser } from "@src/services/auth.service";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { setIsLoading, setUser, router, user } = useAuth();

    useEffect(() => {
        const exec = async () => {
            setIsLoading(true);
            const user = await getLocalUser();

            if (!user) {
                setIsLoading(false);
                return router.push('/login')
            }

            const data = {
                dataLimit: user.dataLimit,
                dev_coins: user.dev_coins,
                email: user.email,
                hasDataClient: user.hasDataClient,
                id: user.id,
                username: user.username,
            }

            setUser(data)
            setIsLoading(false);
        }

        exec();
    }, [])

    return (
        <>
            {children}
        </>
    )
}