import {Hero} from "@/components/Hero";
import Features from "@/components/Features";
// import Contact from "@/components/ContactSection";

import {Pricing} from "@/components/Pricing";
import { FloatingNavbar } from "@/components/Navbar";
import {Footer} from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <FloatingNavbar />
      <Hero />
      <Features />
      <Pricing />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}
