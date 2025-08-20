"use client";

import Footer from "@src/components/footer";
import ScreenMessage from "@src/components/screen-message";
import AuthProvider, { useAuth } from "@src/contexts/AuthContext";
import { ReactNode } from "react";

export default function LayoutClient({ children }: { children: ReactNode }) {
    const { screenMsg } = useAuth();

    return (
        <>
            {/* <AuthProvider> */}
                {screenMsg && <ScreenMessage type={screenMsg.type} message={screenMsg.message} />}
                {children}
            {/* </AuthProvider> */}
            <Footer />
        </>
    )
}