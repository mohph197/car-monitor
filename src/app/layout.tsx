import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Factory 86',
    description: 'Factory 86 is a car factory',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${inter.className} text-sm antialiased`} lang="en">
            <body className="min-h-screen">
                <AuthProvider>
                    <Toaster />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
