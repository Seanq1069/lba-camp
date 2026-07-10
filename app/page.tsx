import { getContent } from '@/lib/content';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sections from '@/components/Sections';
import RegisterSection from '@/components/RegisterSection';
import Footer from '@/components/Footer';

export const revalidate = 60;

export default async function Home() {
  const c = await getContent();
  return (
    <main>
      <Header content={c} />
      <Hero content={c} />
      <Sections content={c} />
      <RegisterSection content={c} formspreeId={process.env.NEXT_PUBLIC_FORMSPREE_ID || ''} />
      <Footer content={c} />
    </main>
  );
}
