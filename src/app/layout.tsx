import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phaltan Dairy ERP | AI Paneer Manufacturing Command Center',
  description: 'Enterprise ERP with AI Yield Optimization & Cold Chain IoT Telemetry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
