import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import DiagnosisSection from '@/components/DiagnosisSection';
import SolutionSection from '@/components/SolutionSection';
import ServicesSection from '@/components/ServicesSection';
import MethodologySection from '@/components/MethodologySection';
import MeaningSection from '@/components/MeaningSection';
import ResultsSection from '@/components/ResultsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <DiagnosisSection />
        <SolutionSection />
        <ServicesSection />
        <MethodologySection />
        <MeaningSection />
        <ResultsSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
      <WhatsAppFloat />
    </>
  );
};

export default Index;
