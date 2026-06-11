import LeadProvider from "@/components/lead/LeadContext";
import Navbar from "@/components/Navbar";
import ScrollScene from "@/components/ScrollScene";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyVendigo from "@/components/sections/WhyVendigo";
import Locations from "@/components/sections/Locations";
import Testimonials from "@/components/sections/Testimonials";
import PlatformNumbers from "@/components/sections/PlatformNumbers";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LeadProvider>
      <main className="relative bg-void">
        <Navbar />
        <ScrollScene />
        <TrustBar />
        <HowItWorks />
        <WhyVendigo />
        <Locations />
        <Testimonials />
        <PlatformNumbers />
        <Faq />
        <FinalCta />
        <Footer />
      </main>
    </LeadProvider>
  );
}
