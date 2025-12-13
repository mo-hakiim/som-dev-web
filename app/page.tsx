import { Navigation } from '@/components/navigation';
import {
  HeroSection,
  TrustedCompanies,
  ServicesPreview,
  ProjectsPreview,
  Testimonials,
  CTASection,
} from '@/components/home-sections';
import { Footer } from '@/components/footer';
import { CursorProvider } from '@/components/ui/custom-cursor';
import { FeaturesShowcase } from '@/components/features-showcase';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-background'>
      <Navigation />
      <HeroSection />
      <TrustedCompanies />
      <ServicesPreview />
      <FeaturesShowcase />
      <ProjectsPreview />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
