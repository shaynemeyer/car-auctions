import Navbar from '@/app/components/nav/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import ToasterProvider from './providers/ToasterProvider';
import SignalRProvider from './providers/SignalRProvider';
import { getCurrentUser } from './actions/authActions';

export const metadata: Metadata = {
  title: 'Car Auctions',
  description: 'A Car Auction Application',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        <main className="container mx-auto px-5 pt-10">
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
