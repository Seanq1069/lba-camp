import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: 'Leesburg Baseball Academy Camp | Q Athletics',
    description:
      'Develop the skills, understand the game, compete with confidence. Leesburg Baseball Academy Camp brought to you by Q Athletics — instruction from college and high-level baseball players in Leesburg, Virginia.',
    icons: c.lbaLogoUrl ? { icon: c.lbaLogoUrl, apple: c.lbaLogoUrl } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-navy-dark antialiased">{children}</body>
    </html>
  );
}
