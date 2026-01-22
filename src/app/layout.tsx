import type {Metadata} from "next";
import {Catamaran} from "next/font/google";
import "./globals.css";
import React from "react";

const catamaran = Catamaran({
    variable: "--font-catamaran",
    subsets: ["latin"],
    weight: [ "400","700"],
});

export const metadata: Metadata = {
    title: "Agendamentos de Cortes",
    description: "Aplicação para agendamento de cortes de cabelo",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
        <body
            className={`${catamaran.variable}  antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
