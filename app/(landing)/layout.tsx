import FooterSection from "@/components/layout/sections/footer-section";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <FooterSection />
    </div>
  );
}
