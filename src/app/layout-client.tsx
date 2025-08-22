"use client";

import Footer from "@src/components/footer";
import Loading from "@src/components/loading";
import ScreenMessage from "@src/components/screen-message";
import { useAuth } from "@src/contexts/AuthContext";
import { ReactNode } from "react";

export default function LayoutClient({ children }: { children: ReactNode }) {
    const { screenMsg, isLoading } = useAuth();


    return (
        <>
            {/* <AuthProvider> */}
            {isLoading && <Loading />}
            {screenMsg && <ScreenMessage type={screenMsg.type} message={screenMsg.message} />}
            {children}
            {/* </AuthProvider> */}
            <Footer />
        </>
    )
}