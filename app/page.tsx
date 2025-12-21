import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ServicesSection } from "@/components/services-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AppWrapper } from "@/components/app-wrapper"

export default function Home() {
  return (
    <AppWrapper>
      <Navigation />
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="experience">
          <ExperienceSection />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </AppWrapper>
  )
}
