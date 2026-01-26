import HeroSection from "@/components/layout/sections/hero-section";
import PricingComparatorSection from "@/components/layout/sections/pricing-comparator-section";
import PricingSection from "@/components/layout/sections/pricing-section";
import StatsSection from "@/components/layout/sections/pricing-section";
import TestimonialSection from "@/components/layout/sections/testimonial-section";

export default function Page() {
    return (
        <>

            <HeroSection />

            <StatsSection />

            <PricingSection />

            <PricingComparatorSection />

            {/* <TestimonialSection /> */}

        </>
    )
}