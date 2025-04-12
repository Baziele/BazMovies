import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "BazMovies - Watch the Latest Movies",
    description: "Stream the latest movies and TV shows on BazMovies",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <div className="flex-1">{children}</div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

import "./globals.css";
