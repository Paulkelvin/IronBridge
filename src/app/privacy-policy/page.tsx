import type { Metadata } from "next"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SlideEffect from "@/components/slide-effect"

export const metadata: Metadata = {
  title: "Privacy Policy | Iron Bridge Mobility Solutions",
  description: "How Iron Bridge Mobility Solutions collects, uses, and protects information submitted through this website.",
}

const sections = [
  {
    title: "Information We Collect",
    body: [
      "When you submit a quote request or contact form, we collect the information you provide, such as your name, company, email address, phone number, pickup and delivery addresses, and shipment details.",
      "Like most websites, our hosting and analytics tools may automatically log standard technical information, such as IP address, browser type, and pages visited, for security and site-performance purposes.",
    ],
  },
  {
    title: "Protected Health Information",
    body: [
      "This website is not intended for the submission of patient names, diagnoses, or other protected health information (PHI), and our forms ask you not to include it. PHI we may handle in the course of providing medical courier services is governed separately by any applicable business associate agreement with our healthcare clients, not by this website's data collection.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information you submit to respond to quote requests, schedule and dispatch deliveries, communicate with you about service, and improve our website and operations. We do not sell your information.",
    ],
  },
  {
    title: "Cookies & Analytics",
    body: [
      "This site does not currently use third-party advertising or tracking cookies. If we add analytics or marketing tools in the future, we will update this policy to describe what's collected and how it's used.",
    ],
  },
  {
    title: "How We Share Information",
    body: [
      "We share information only with Iron Bridge personnel and contractors involved in fulfilling your request, or when required by law, legal process, or to protect the safety and rights of Iron Bridge, our clients, or the public.",
    ],
  },
  {
    title: "Data Security & Retention",
    body: [
      "We use reasonable administrative and technical safeguards to protect the information you submit, though no method of transmission or storage is completely secure. We retain information for as long as reasonably necessary to fulfill the purposes described in this policy or as required by law.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "To request access to, correction of, or deletion of information you've submitted through this website, contact us using the information below.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "This website is not directed to children under 13, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The date below reflects the most recent revision.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 scroll-smooth">
      <PageHeader
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        description="How we collect, use, and protect information submitted through this website."
      />

      <div className="max-w-3xl mx-auto w-full space-y-10 md:space-y-12">
        <SlideEffect isSpring={false}>
          <p className="text-sm text-foreground/80">Effective Date: September 14, 2026</p>
        </SlideEffect>

        {sections.map((section, i) => (
          <SlideEffect key={section.title} direction="top" delay={0.04 * i} isSpring={false} className="space-y-3">
            <h2 className="font-serif text-navy text-lg md:text-xl font-semibold">{section.title}</h2>
            {section.body.map((p, j) => (
              <p key={j} className="text-sm md:text-base text-foreground/80 leading-relaxed">{p}</p>
            ))}
          </SlideEffect>
        ))}

        <SlideEffect isSpring={false} className="space-y-3">
          <h2 className="font-serif text-navy text-lg md:text-xl font-semibold">Contact Us</h2>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            Questions about this Privacy Policy or the information you&apos;ve submitted can be directed to{" "}
            <a href="mailto:lbrent@ironbridgems.com" className="text-navy underline underline-offset-2 hover:text-teal transition-colors">
              lbrent@ironbridgems.com
            </a>{" "}
            or{" "}
            <a href="tel:+13018181929" className="text-navy underline underline-offset-2 hover:text-teal transition-colors">
              (301) 818-1929
            </a>.
          </p>
        </SlideEffect>
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
