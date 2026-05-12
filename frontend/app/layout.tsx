import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs"
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Elevate Learning",
    description: "Adaptive Learning to Ace the SAT",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
                <body suppressHydrationWarning className="min-h-screen">
                    {/*NavBar*/}
                    {/*Main Section*/}
                    {children}
                    {/*Footer*/}
                </body>
            </html>
        </ClerkProvider>
    );
}
