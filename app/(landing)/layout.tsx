import { Navbar } from "@/components/layout/navbar"
import FooterSection from "@/components/layout/sections/footer-section"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Navbar />
        {children}
        <FooterSection />
    </div>
  )
}