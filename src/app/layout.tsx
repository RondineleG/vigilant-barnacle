import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Login Page',
  description: 'Login Page For Website',
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}