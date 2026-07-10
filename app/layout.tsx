import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Loudoun Baseball Academy Camp | Q Athletics',
  description:
    'Develop the skills, understand the game, compete with confidence. Loudoun Baseball Academy Camp brought to you by Q Athletics — instruction from college and high-level baseball players in Leesburg, Virginia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-navy-dark antialiased">{children}</body>
    </html>
  );
}
