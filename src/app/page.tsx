import { Hero } from "@/components/Hero";
import Features from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { FloatingNavbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { LoaderOne } from "@/components/ui/loader";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <LoaderOne />
        </div>
      }
    >
      <FloatingNavbar />
      <Hero />
      <Features />
      <Pricing />
      {/* <Contact /> */}
      <Footer />
    </Suspense>
  );
}
