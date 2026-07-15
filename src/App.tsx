import { FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  DatabaseZap,
  Globe,
  Layers3,
  LineChart,
  Linkedin,
  LucideIcon,
  Mail,
  MapPin,
  MessageSquare,
  MousePointer2,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormStatus = "idle" | "sending" | "sent" | "error";

const contact = {
  email: "sammahmud362@gmail.com",
  linkedIn: "https://www.linkedin.com/in/saminmahmud",
  website: "https://www.kazisamin.com",
  location: "Dhaka, Bangladesh"
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

const heroChips = [
  { label: "Product Strategy", className: "left-4 top-[39%] sm:left-[11%] sm:top-[46%] lg:left-[13%]" },
  { label: "User Research", className: "right-4 top-[47%] sm:right-[10%] sm:top-[37%] lg:right-[14%]" },
  { label: "Product Analytics", className: "bottom-[31%] left-5 sm:bottom-[19%] sm:left-[17%] lg:left-[21%]" },
  { label: "AI Products", className: "bottom-[25%] right-5 sm:bottom-[17%] sm:right-[17%] lg:right-[21%]" }
];

const marqueeRowOne = [
  "12+ Features Launched",
  "30% Engagement Growth",
  "5% Revenue Growth",
  "AI Assessment Tool",
  "Product Roadmaps",
  "DAU / MAU Analysis",
  "User Research",
  "PRD Writing",
  "Stakeholder Management"
];

const marqueeRowTwo = [
  "Riseup Labs",
  "Bdjobs.com",
  "Adplay Technology",
  "Bdjobs Pro",
  "Bdjobs Recruiter",
  "Gamestar",
  "Quizmaster",
  "Let Us Learn",
  "Trainr"
];

const metrics = [
  { value: "50+", label: "features shipped" },
  { value: "7", label: "product domains" },
  { value: "5+", label: "products from zero" },
  { value: "4+", label: "years in product" }
];

const expertise = [
  {
    number: "01",
    title: "Product Management",
    body: "Leading products from discovery to launch by aligning customer needs, business priorities, and technical delivery. I coordinate cross-functional teams, manage scope and backlogs, communicate with stakeholders, and keep execution focused on measurable outcomes."
  },
  {
    number: "02",
    title: "Product Strategy",
    body: "Defining product vision, positioning, roadmaps, and feature priorities that connect user needs with business goals. I evaluate market opportunities, clarify strategic trade-offs, and turn long-term direction into practical plans for sustainable growth."
  },
  {
    number: "03",
    title: "User Research",
    body: "Conducting market research, stakeholder interviews, user interviews, surveys, feedback analysis, and UAT to uncover real needs. I translate qualitative and quantitative findings into actionable insights, product improvements, and clearer user experiences."
  },
  {
    number: "04",
    title: "Product Analytics",
    body: "Defining North Star metrics and supporting input, activation, engagement, retention, conversion, and revenue metrics. I use funnel, cohort, segmentation, trend, and user-behavior analysis, including DAU/MAU and churn, to identify opportunities, test hypotheses, and guide data-informed decisions."
  },
  {
    number: "05",
    title: "Product Documentation",
    body: "Writing clear SRS, BRD, PRD, functional requirements, user stories, acceptance criteria, use cases, and release documentation. I also create wireframes, process flows, user journeys, feature specifications, and stakeholder-ready presentations that keep business, design, and engineering aligned."
  },
  {
    number: "06",
    title: "AI & Digital Products",
    body: "Building and improving AI-enabled products, SaaS platforms, MVAS products, recruitment tools, gaming portals, and digital services. I combine rapid discovery, iterative delivery, and performance insights to turn emerging technology into useful, scalable product experiences."
  }
];

const aboutText =
  "I am a Product Manager with a strong background in product analysis, user research, and data-driven decision-making. I work with cross-functional teams to build scalable products, improve user experience, and drive business growth through product strategy, analytics, and user-centered execution.";

const aboutCards = [
  { title: "Strategy", icon: BrainCircuit, className: "md:left-[6%] md:top-[19%] xl:left-[10%]" },
  { title: "Analytics", icon: LineChart, className: "md:right-[6%] md:top-[20%] xl:right-[11%]" },
  { title: "Research", icon: Users, className: "md:bottom-[15%] md:left-[10%] xl:left-[16%]" },
  { title: "Execution", icon: Workflow, className: "md:bottom-[14%] md:right-[10%] xl:right-[16%]" }
];

const experience = [
  {
    company: "Riseup Labs",
    role: "Product Analyst (Senior Executive)",
    duration: "Sep 2024 - Present",
    points: [
      "Conducted market and user research to identify growth opportunities for clients including UNICEF, Sesame Workshop, Planning Ministry, Election Commission, Chemonics, ROCHE, and a2i.",
      "Analyzed user behavior, data trends, DAU, MAU, retention, and product metrics to support strategic product decisions.",
      "Defined product roadmaps aligned with business objectives and stakeholder priorities.",
      "Created wireframes, PRDs, and feature documentation for designers and developers.",
      "Participated in User Acceptance Testing across different regions of Bangladesh.",
      "Planned and oversaw development of Trainr, a fitness app for a global client."
    ]
  },
  {
    company: "Bdjobs.com",
    role: "Product Analyst",
    duration: "Apr 2023 - Aug 2024",
    points: [
      "Acted as Product Owner for Bdjobs Recruiter and Bdjobs E-learning platforms.",
      "Launched and enhanced 12+ features, boosting user engagement by 30%.",
      "Built and launched Bdjobs Pro, contributing to a 5% increase in overall revenue.",
      "Launched an AI Assessment tool for candidates and employers.",
      "Improved recruiter UX and increased DAU/MAU metrics.",
      "Revamped the Job Fair application process and improved candidate experience.",
      "Defined product vision and roadmap for Recruiter and My Bdjobs platforms."
    ]
  },
  {
    company: "Adplay Technology Ltd.",
    role: "Product Executive",
    duration: "Aug 2022 - Mar 2023",
    points: [
      "Managed Adplay DSP and ensured smooth ad delivery and platform performance.",
      "Launched Quizmaster and Gamestar, integrated with bKash and MyGP.",
      "Drove 50% revenue growth for Gamestar and 10% uplift for Quizmaster through MVAS optimization.",
      "Developed Baarta and launched 3+ features within 8 months.",
      "Defined product roadmaps and go-to-market strategies for VAS, SaaS, and MVAS offerings.",
      "Created detailed use cases, user journeys, and stakeholder presentations."
    ]
  }
];

const projects = [
  {
    name: "Bdjobs Recruiter",
    category: "B2B Recruitment Platform",
    impact: "Improved recruiter experience and engagement",
    role: "Product Owner / Product Analyst",
    description:
      "Reimagined the recruiter platform with improved job posting flows, a reporting dashboard for HR, and AI Assessment features for the hiring process.",
    tags: ["Recruitment", "B2B", "AI Assessment", "Dashboard", "UX"],
    icon: BriefcaseBusiness,
    visual: "dashboard"
  },
  {
    name: "Bdjobs Pro",
    category: "Premium Jobseeker Product",
    impact: "5% revenue growth and 20% user retention",
    role: "Product Analyst",
    description:
      "Launched a premium service for jobseekers with application insights, profile matching, and enhanced benefits, creating a new revenue stream.",
    tags: ["Premium Product", "Jobseekers", "Revenue", "Retention"],
    icon: Sparkles,
    visual: "premium"
  },
  {
    name: "Gamestar",
    category: "Game Portal / MVAS",
    impact: "50% revenue growth",
    role: "Product Executive",
    description:
      "Subscription-based live gaming portal where users can sign up, play games, and compete. Integrated with bKash and telco platforms.",
    tags: ["Gaming", "MVAS", "bKash", "MyGP", "Monetization"],
    icon: Target,
    visual: "gaming"
  },
  {
    name: "Quizmaster",
    category: "Quiz Portal / MVAS",
    impact: "10% revenue uplift",
    role: "Product Executive",
    description:
      "Live quiz platform where users participate in quizzes and earn rewards. Optimized through MVAS monetization and platform improvements.",
    tags: ["Quiz", "MVAS", "Rewards", "Monetization"],
    icon: BrainCircuit,
    visual: "quiz"
  },
  {
    name: "Let Us Learn",
    category: "EdTech / Social Impact / UNICEF",
    impact: "Improved remote user experience through UAT",
    role: "Product Analyst",
    description:
      "Supported UNICEF's Let Us Learn Bangladesh program through wireframes, sprint planning, requirement analysis, and UAT in remote regions.",
    tags: ["UNICEF", "EdTech", "UAT", "Wireframes", "Social Impact"],
    icon: ShieldCheck,
    visual: "learning"
  },
  {
    name: "Trainr",
    category: "Fitness App",
    impact: "End-to-end product planning for global client",
    role: "Product Analyst",
    description:
      "Designed and managed development of a fitness app, including PRDs for iOS, Android, and the back-office admin panel.",
    tags: ["Fitness", "Mobile App", "PRD", "Admin Panel", "Global Client"],
    icon: Workflow,
    visual: "mobile"
  }
];

const skills = [
  {
    title: "Product Management",
    items: [
      "Product Strategy",
      "Product Roadmapping",
      "PRD Writing",
      "Stakeholder Management",
      "Agile",
      "Scrum",
      "Kanban",
      "SDLC",
      "Feature Prioritization",
      "UAT"
    ]
  },
  {
    title: "Research & Design",
    items: [
      "User Research",
      "Market Research",
      "Wireframing",
      "Product Design",
      "User Journey Mapping",
      "Figma",
      "Miro",
      "Lucid",
      "Canva"
    ]
  },
  {
    title: "Analytics",
    items: [
      "GA4",
      "Mixpanel",
      "Firebase",
      "Microsoft Clarity",
      "Excel",
      "Tableau",
      "Power BI",
      "DAU Analysis",
      "MAU Analysis",
      "Retention Analysis"
    ]
  },
  {
    title: "Technical & AI",
    items: [
      "GitHub",
      "Postman",
      "AWS",
      "DigitalOcean",
      "ChatGPT",
      "n8n",
      "Lovable",
      "Figma Make",
      "Prompt Engineering",
      "Python",
      "MySQL",
      "MongoDB"
    ]
  }
];

const certifications = [
  "Becoming a Product Manager: A Complete Guide",
  "Product Management: Building a Product Strategy",
  "Generative AI for Product Managers",
  "Agile Project Management with Jira Cloud",
  "Technology for Product Managers",
  "Explore a Career in Product Management - LinkedIn Learning Path"
];

const smoothEase = [0.22, 1, 0.36, 1] as const;
const fadeEase = [0.25, 0.1, 0.25, 1] as const;
const fadeTransition: Transition = { duration: 0.45, ease: smoothEase };
const revealViewport = { once: true, amount: 0.12 } as const;
const revealDelay = (index: number) => Math.min(index * 0.04, 0.16);

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: fadeTransition
};

function useGsapEnhancements() {
  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const hero = document.querySelector<HTMLElement>("#top");
      const portraitOrbit = hero?.querySelector<HTMLElement>(".hero-portrait-orbit");
      const portraitImage = hero?.querySelector<HTMLElement>(".hero-portrait-image");
      const portraitBob = hero?.querySelector<HTMLElement>(".hero-portrait-bob");

      if (hero && portraitOrbit && portraitImage) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true
            }
          })
          .to(portraitOrbit, { rotation: 4, ease: "none" }, 0)
          .to(portraitImage, { yPercent: 2.5, scale: 1.12, ease: "none" }, 0);
      }

      if (hero && portraitBob) {
        gsap.to(portraitBob, {
          y: -5,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause"
          }
        });
      }

      gsap.utils.toArray<HTMLElement>(".expertise-number").forEach((number) => {
        gsap.fromTo(
          number,
          { x: -8 },
          {
            x: 8,
            ease: "none",
            scrollTrigger: {
              trigger: number.closest("article") ?? number,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );
      });
    });

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".project-grid-card").forEach((card) => {
        const glow = card.querySelector<HTMLElement>(".case-visual-glow");
        if (!glow) return;

        gsap.fromTo(
          glow,
          { yPercent: -8, rotation: -6 },
          {
            yPercent: 8,
            rotation: 6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );
      });
    });

    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const stage = document.querySelector<HTMLElement>(".hero-portrait-stage");
      const floatingLayer = stage?.querySelector<HTMLElement>(".hero-portrait-float");
      if (!stage || !floatingLayer) return;

      let bounds: DOMRect | null = null;
      const moveX = gsap.quickTo(floatingLayer, "x", { duration: 0.45, ease: "power3.out" });
      const moveY = gsap.quickTo(floatingLayer, "y", { duration: 0.45, ease: "power3.out" });
      const rotateX = gsap.quickTo(floatingLayer, "rotateX", { duration: 0.55, ease: "power3.out" });
      const rotateY = gsap.quickTo(floatingLayer, "rotateY", { duration: 0.55, ease: "power3.out" });

      gsap.set(floatingLayer, { transformPerspective: 1000, transformOrigin: "center center" });

      const updateBounds = () => {
        bounds = stage.getBoundingClientRect();
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!bounds) updateBounds();
        if (!bounds) return;

        const horizontal = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
        const vertical = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);

        moveX(horizontal * 8);
        moveY(vertical * 5);
        rotateX(vertical * -2.2);
        rotateY(horizontal * 2.8);
      };

      const resetPortrait = () => {
        bounds = null;
        moveX(0);
        moveY(0);
        rotateX(0);
        rotateY(0);
      };

      stage.addEventListener("pointerenter", updateBounds);
      stage.addEventListener("pointermove", handlePointerMove);
      stage.addEventListener("pointerleave", resetPortrait);
      window.addEventListener("resize", updateBounds);

      return () => {
        stage.removeEventListener("pointerenter", updateBounds);
        stage.removeEventListener("pointermove", handlePointerMove);
        stage.removeEventListener("pointerleave", resetPortrait);
        window.removeEventListener("resize", updateBounds);
      };
    });

    ScrollTrigger.refresh();

    return () => media.revert();
  }, []);
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const supportsCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursor || !supportsCursor || reduceMotion) return;

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });
    let isVisible = false;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const showCursor = () => {
      if (isVisible) return;
      isVisible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: true });
    };

    const hideCursor = () => {
      isVisible = false;
      cursor.classList.remove("is-interactive", "is-text", "is-pressed");
      gsap.killTweensOf(cursor, "opacity");
      gsap.set(cursor, { opacity: 0 });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (
        event.clientX <= 0 ||
        event.clientY <= 0 ||
        event.clientX >= window.innerWidth ||
        event.clientY >= window.innerHeight
      ) {
        hideCursor();
        return;
      }

      const x = event.clientX + 18;
      const y = event.clientY + 18;

      if (!isVisible) {
        gsap.set(cursor, { x, y });
        showCursor();
        return;
      }

      moveX(x);
      moveY(y);
    };

    const updateCursorState = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle("is-interactive", Boolean(target?.closest("a, button, [data-cursor-interactive]")));
      cursor.classList.toggle("is-text", Boolean(target?.closest("input, textarea, [contenteditable='true']")));
    };

    const pressCursor = () => cursor.classList.add("is-pressed");
    const releaseCursor = () => cursor.classList.remove("is-pressed");
    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hideCursor();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) hideCursor();
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", updateCursorState, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mousedown", pressCursor, { passive: true });
    document.addEventListener("mouseup", releaseCursor, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", hideCursor);
    window.addEventListener("pagehide", hideCursor);
    window.addEventListener("pointercancel", hideCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", updateCursorState);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", pressCursor);
      document.removeEventListener("mouseup", releaseCursor);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", hideCursor);
      window.removeEventListener("pagehide", hideCursor);
      window.removeEventListener("pointercancel", hideCursor);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} aria-hidden="true">
      <MousePointer2 className="custom-cursor-icon" />
    </div>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.45,
  x = 0,
  y = 20
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={revealViewport}
      transition={{ duration, delay, ease: fadeEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Magnet({ children, className = "", strength = 0.22 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function ContactButton({
  children,
  href,
  type = "button",
  disabled = false,
  icon,
  className = ""
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
}) {
  const classes = `inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-accent-gradient px-8 font-medium uppercase tracking-widest text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_22px_55px_rgba(182,0,168,0.22)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`;

  if (href) {
    return (
      <Magnet>
        <motion.a href={href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={classes}>
          {children}
          {icon}
        </motion.a>
      </Magnet>
    );
  }

  return (
    <Magnet>
      <motion.button type={type} disabled={disabled} whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.98 }} className={classes}>
        {children}
        {icon}
      </motion.button>
    </Magnet>
  );
}

function GhostButton({
  children,
  href,
  className = ""
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Magnet>
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex h-[56px] items-center justify-center rounded-full border border-[#D7E2EA] bg-transparent px-8 text-sm font-semibold uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:bg-[#D7E2EA]/10 ${className}`}
      >
        {children}
      </motion.a>
    </Magnet>
  );
}

function App() {
  useGsapEnhancements();
  const { scrollYProgress } = useScroll();
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [validation, setValidation] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const spotlight = useMemo(
    () => ({
      background:
        "radial-gradient(circle at 18% 20%, rgba(182,0,168,.24), transparent 28%), radial-gradient(circle at 88% 8%, rgba(190,76,0,.18), transparent 34%), #0C0C0C"
    }),
    []
  );

  const validate = () => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setValidation(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("subject", form.subject);
    payload.append("message", form.message);

    try {
      setStatus("sending");
      const response = await fetch("https://formspree.io/f/mgvzjjwl", {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submission failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setValidation({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen overflow-x-clip bg-ink text-mist" style={spotlight}>
        <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-accent-gradient" style={{ scaleX: scrollYProgress }} />
        <SiteHeader />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection
          form={form}
          validation={validation}
          status={status}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
        <MinimalFooter />
      </main>
    </>
  );
}

function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const updateHeader = () => {
      const nextScrolled = window.scrollY > 16;
      if (nextScrolled === scrolledRef.current) return;
      scrolledRef.current = nextScrolled;
      setIsScrolled(nextScrolled);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b text-[#D7E2EA] transition-[background-color,border-color,box-shadow] duration-200 ${
        isScrolled
          ? "border-white/10 bg-[#0C0C0C]/95 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
          : "border-transparent bg-transparent shadow-none"
      }`}
    >
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: smoothEase }}
        className="flex items-center justify-between px-6 py-5 text-[0.68rem] font-medium uppercase tracking-wider sm:text-sm md:px-10 md:py-6 md:text-lg lg:text-[1.25rem]"
      >
        <a href="#top" className="nav-underline whitespace-nowrap transition duration-200 hover:opacity-70">
          Kazi Samin Mahmud
        </a>
        <div className="flex items-center gap-2 sm:gap-5 md:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-underline transition duration-200 hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-[52%] h-[48vw] max-h-[520px] w-[48vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B600A8]/20 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] h-64 w-64 rounded-full bg-[#BE4C00]/15 blur-[80px]" />

      <div className="relative z-20 mt-[86px] overflow-hidden px-6 sm:mt-[92px] md:mt-[104px] md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
          className="mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight text-gradient sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[15.5vw] lg:text-[16vw]"
        >
          Hi, i'm samin
        </motion.h1>
      </div>

      <HeroPortraitObject />

      {heroChips.map((chip, index) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.75 + index * 0.08, ease: smoothEase }}
          whileHover={{ y: -4, scale: 1.04 }}
          className={`hero-chip absolute z-20 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA] backdrop-blur-md sm:text-xs ${chip.className}`}
        >
          {chip.label}
        </motion.div>
      ))}

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: smoothEase }}
          className="max-w-[180px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[240px] md:max-w-[300px]"
        >
          a product manager building user-centered, data-driven digital products
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: smoothEase }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <ContactButton href="#projects" icon={<ArrowUpRight className="size-4" />} className="h-auto px-5 py-3 text-sm sm:px-6 sm:py-4">
            View Projects
          </ContactButton>
          <GhostButton href="#contact" className="h-auto border-[#D7E2EA]/25 bg-white/5 px-5 py-3 text-sm shadow-[0_0_35px_rgba(215,226,234,0.08)] backdrop-blur-md sm:px-6 sm:py-4">
            Contact Me
          </GhostButton>
        </motion.div>
      </div>
    </section>
  );
}

function HeroPortraitObject() {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0">
      <motion.figure
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.45, ease: smoothEase }}
        className="hero-portrait-stage"
      >
        <div className="hero-portrait-float">
          <div className="hero-portrait-bob">
            <div className="hero-portrait-glow" aria-hidden="true" />
            <div className="hero-portrait-orbit" aria-hidden="true">
              <span />
              <span />
            </div>

            <div className="hero-portrait-frame">
              <img
                src="/My-Image.jpg"
                alt="Kazi Samin Mahmud"
                width="1152"
                height="1556"
                fetchPriority="high"
                decoding="async"
                className="hero-portrait-image"
              />

              <figcaption className="hero-portrait-caption">
                <span className="hero-portrait-status" aria-hidden="true" />
                <span>
                  <strong>Kazi Samin Mahmud</strong>
                  <small>Product Manager</small>
                </span>
                <span className="hero-portrait-location">Dhaka, BD</span>
              </figcaption>
            </div>
          </div>
        </div>
      </motion.figure>
    </div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const applyTransform = (element: HTMLDivElement | null, direction: "left" | "right", speed: number) => {
      if (!element) return;
      const halfWidth = element.scrollWidth / 2;
      if (!halfWidth) return;
      const offset = (window.scrollY * speed) % halfWidth;
      const x = direction === "right" ? offset - halfWidth : -offset;
      element.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const updateRows = () => {
      frame = 0;
      if (!isVisibleRef.current) return;
      applyTransform(rowOneRef.current, "right", 0.26);
      applyTransform(rowTwoRef.current, "left", 0.22);
    };

    const requestUpdate = () => {
      if (!isVisibleRef.current || frame) return;
      frame = window.requestAnimationFrame(updateRows);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) requestUpdate();
      },
      { rootMargin: "200px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(182,0,168,0.16),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(190,76,0,0.12),transparent_30%)]" />
      <div className="relative space-y-6">
        <MarqueeRow trackRef={rowOneRef} items={marqueeRowOne} />
        <MarqueeRow trackRef={rowTwoRef} items={marqueeRowTwo} />
      </div>
    </section>
  );
}

function MarqueeRow({ items, trackRef }: { items: string[]; trackRef: React.RefObject<HTMLDivElement | null> }) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-5 will-change-transform">
        {repeatedItems.map((item, index) => (
          <MarqueeTile key={`${item}-${index}`}>{item}</MarqueeTile>
        ))}
      </div>
    </div>
  );
}

function MarqueeTile({ children }: { children: ReactNode }) {
  return (
    <div className="marquee-tile flex h-[160px] w-[420px] shrink-0 items-center justify-center rounded-2xl border border-[#D7E2EA]/15 bg-white/5 px-8 text-center text-xl font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-300 hover:scale-[1.02] sm:text-2xl">
      {children}
    </div>
  );
}

function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start 70%", "center 38%"]
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [0.35, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.65], [14, 0]);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:px-8 md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(182,0,168,0.18),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(190,76,0,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B600A8]/10 blur-[110px]" />

      {aboutCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.45, delay: revealDelay(index), ease: smoothEase }}
            whileHover={{ scale: 1.04, y: -6 }}
            className={`absolute z-10 hidden w-[176px] rounded-[32px] border border-[#D7E2EA]/15 bg-white/5 p-6 text-center shadow-[0_0_60px_rgba(182,0,168,0.15)] backdrop-blur-md md:block ${card.className}`}
          >
            <Icon className="mx-auto size-8 text-[#BBCCD7]" />
            <p className="mt-4 text-sm font-medium uppercase tracking-[.24em] text-[#D7E2EA]">{card.title}</p>
          </motion.div>
        );
      })}

      <motion.div {...fadeUp} className="relative z-20 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="overflow-hidden">
          <h2 className="text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-gradient">
            About me
          </h2>
        </div>

        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="mt-10 max-w-[680px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
        >
          {aboutText}
        </motion.p>

        <div className="mt-10">
          <ContactButton href="#contact" className="h-auto px-7 py-4 text-sm">
          Contact Me
          </ContactButton>
        </div>
      </motion.div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          {...fadeUp}
          className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        >
          Expertise
        </motion.h2>

        <div className="mx-auto max-w-5xl">
          {expertise.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.45, delay: revealDelay(index), ease: smoothEase }}
              className="grid gap-5 border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:grid-cols-[.32fr_.68fr] md:gap-10 md:py-12"
            >
              <div className="expertise-number text-[clamp(3rem,10vw,140px)] font-black uppercase leading-none text-[#0C0C0C]">
                {item.number}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight tracking-wide text-[#0C0C0C]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C]/60">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <motion.h2
        {...fadeUp}
        className="mx-auto max-w-7xl text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-gradient"
      >
        Experience
      </motion.h2>

      <div className="mx-auto mt-14 grid max-w-7xl gap-6 sm:mt-16 md:mt-20">
        {experience.map((item, index) => (
          <motion.article
            key={item.company}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.45, delay: revealDelay(index), ease: smoothEase }}
            whileHover={{ y: -4 }}
            className="experience-card group relative overflow-hidden rounded-[32px] border border-[#D7E2EA]/15 bg-white/5 p-6 shadow-glass transition-all duration-300 hover:bg-white/[0.07] sm:rounded-[40px] sm:p-8 md:p-10"
          >
            <div className="relative z-10 grid items-start gap-8 lg:grid-cols-[minmax(300px,.36fr)_minmax(0,.64fr)] lg:gap-10 xl:gap-14">
              <div>
                <div className="mb-6 inline-flex rounded-full border border-[#D7E2EA]/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[.22em] text-[#D7E2EA]/70">
                  {item.duration}
                </div>
                <h3 className="text-[clamp(2.2rem,5vw,4.9rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
                  {item.company}
                </h3>
                <p className="mt-4 text-[clamp(1rem,1.8vw,1.55rem)] font-light uppercase leading-snug tracking-[.12em] text-[#D7E2EA]/58">
                  {item.role}
                </p>
              </div>

              <ul className={`experience-points grid gap-x-8 gap-y-0 ${index > 0 ? "experience-points-dense xl:grid-cols-2" : ""}`}>
                {item.points.map((point, pointIndex) => (
                  <li
                    key={point}
                    className={`flex gap-3 border-t border-white/[0.08] py-4 text-[clamp(0.92rem,1.15vw,1.05rem)] font-light leading-relaxed text-[#D7E2EA]/70 first:border-t-0 first:pt-0 ${
                      index > 0 && pointIndex === item.points.length - 1 && item.points.length % 2 !== 0
                        ? "xl:col-span-2"
                        : ""
                    }`}
                  >
                    <CheckCircle2 className="mt-1 size-[18px] shrink-0 text-[#BBCCD7]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#09090B] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(182,0,168,0.13),transparent_28%),radial-gradient(circle_at_92%_52%,rgba(190,76,0,0.1),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[1fr_.52fr] md:items-end md:pb-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[.24em] text-[#D7E2EA]/60">
              <Sparkles className="size-4" />
              Selected work
            </span>
            <h2 className="mt-6 text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[.82] tracking-tight text-gradient">
              Projects
            </h2>
          </div>

          <div className="md:pb-1">
            <p className="max-w-xl text-[clamp(1rem,1.6vw,1.2rem)] font-light leading-relaxed text-[#D7E2EA]/65">
              A selection of B2B, consumer, AI, MVAS, and social-impact products, presented through the role I played and the outcome each product delivered.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[.22em] text-[#D7E2EA]/45">
              <span>06 case studies</span>
              <span className="h-px flex-1 bg-white/10" />
              <span>2022 - Present</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-7 md:mt-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              number={String(index + 1).padStart(2, "0")}
              category={project.category}
              title={project.name}
              impact={project.impact}
              role={project.role}
              description={project.description}
              tags={project.tags}
              icon={project.icon}
              visual={project.visual}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  number,
  category,
  title,
  impact,
  role,
  description,
  tags,
  icon: Icon,
  visual,
  index
}: {
  number: string;
  category: string;
  title: string;
  impact: string;
  role: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  visual: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.45, delay: revealDelay(index), ease: smoothEase }}
      className="project-grid-card group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] sm:rounded-[36px]"
    >
      <div className="relative border-b border-white/10 p-3 sm:p-4">
        <ProductCaseVisual visual={visual} />
        <span className="absolute left-6 top-6 z-20 rounded-full border border-white/15 bg-[#0C0C0C]/85 px-3 py-2 text-xs font-semibold tracking-[.2em] text-[#D7E2EA]/75 shadow-lg sm:left-7 sm:top-7">
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <p className="pt-1 text-xs font-medium uppercase leading-relaxed tracking-[.22em] text-[#D7E2EA]/50">
            {category}
          </p>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-[#D7E2EA]/12 bg-white/[0.05] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <Icon className="size-5 text-[#BBCCD7]" />
          </span>
        </div>

        <h3 className="mt-4 text-[clamp(2.2rem,4vw,4rem)] font-black uppercase leading-[.9] tracking-tight text-[#D7E2EA]">
          {title}
        </h3>
        <p className="mt-5 text-[clamp(0.95rem,1.3vw,1.08rem)] font-light leading-relaxed text-[#D7E2EA]/65">
          {description}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-[1.08fr_.92fr]">
          <div className="project-outcome-panel rounded-[22px] border border-white/10 p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.2em] text-[#D7E2EA]/45">
              <BarChart3 className="size-4" />
              Impact
            </div>
            <p className="mt-3 text-lg font-semibold leading-snug text-[#D7E2EA]">{impact}</p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.2em] text-[#D7E2EA]/45">
              <Workflow className="size-4" />
              Role
            </div>
            <p className="mt-3 font-medium leading-snug text-[#D7E2EA]/80">{role}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#D7E2EA]/12 bg-white/[0.025] px-3 py-2 text-[0.68rem] font-medium uppercase tracking-wider text-[#D7E2EA]/55"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-b border-[#D7E2EA]/30 pb-1 text-sm font-medium uppercase tracking-[.18em] text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA]"
          >
            Discuss this project
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ProductCaseVisual({ visual }: { visual: string }) {
  return (
    <div className={`case-visual case-visual-${visual}`}>
      <div className="case-visual-glow" />
      <div className="case-window">
        <div className="case-window-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="case-window-body">
          <div className="case-sidebar">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="case-main">
            <div className="case-chart">
              <span style={{ height: "42%" }} />
              <span style={{ height: "68%" }} />
              <span style={{ height: "54%" }} />
              <span style={{ height: "86%" }} />
              <span style={{ height: "76%" }} />
            </div>
            <div className="case-card-row">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className="case-mobile">
        <div />
        <span />
        <span />
      </div>
      <div className="case-floating-tile tile-a">{visual === "quiz" ? "Q" : "AI"}</div>
      <div className="case-floating-tile tile-b">{visual === "mobile" ? "PRD" : "KPI"}</div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="-mt-10 rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <motion.div {...fadeUp} className="mx-auto max-w-7xl">
        <h2 className="text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C]">
          Skills
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:mt-20 md:grid-cols-2">
          {skills.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.45, delay: revealDelay(index), ease: smoothEase }}
              whileHover={{ y: -8 }}
              className="min-h-[320px] rounded-[32px] border border-black/10 bg-[#F5F5F5] p-8 transition duration-300 sm:rounded-[40px] sm:p-10"
            >
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-tight tracking-tight text-[#0C0C0C]">
                {group.title}
              </h3>
              <div className="mt-8 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ y: -3 }}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-light text-[#0C0C0C] transition sm:text-base"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section id="certifications" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <motion.h2
        {...fadeUp}
        className="mx-auto max-w-7xl text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-gradient"
      >
        Learning
      </motion.h2>

      <div className="mx-auto mt-14 max-w-5xl sm:mt-16 md:mt-20">
        {certifications.map((item, index) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.45, delay: revealDelay(index), ease: smoothEase }}
            className="grid gap-4 border-b border-[#D7E2EA]/15 py-6 transition-all duration-300 hover:bg-white/[0.03] sm:grid-cols-[92px_1fr_auto] sm:items-center sm:gap-6 sm:py-8"
          >
            <span className="text-3xl font-black uppercase leading-none text-[#D7E2EA]/45 sm:text-4xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[clamp(1.1rem,2vw,1.75rem)] font-medium uppercase leading-tight tracking-wide text-[#D7E2EA]">
              {item}
            </h3>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/70 backdrop-blur-md">
              <Award className="size-4" />
              Certificate
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ContactSection({
  form,
  validation,
  status,
  setForm,
  handleSubmit
}: {
  form: FormState;
  validation: FormErrors;
  status: FormStatus;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(182,0,168,0.18),transparent_30%),radial-gradient(circle_at_86%_82%,rgba(190,76,0,0.13),transparent_30%)]" />
      <FadeIn className="relative z-10 mx-auto max-w-7xl text-center">
        <h2 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-none tracking-tight text-gradient">
          Let's build something meaningful.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.8vw,1.4rem)] font-light leading-relaxed text-[#D7E2EA]/70">
          Have a product idea, platform, or digital experience to build? Send me a message and I’ll get back to you.
        </p>
      </FadeIn>

      <div className="relative z-10 mx-auto mt-14 grid max-w-7xl gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-stretch">
        <motion.div {...fadeUp} className="contact-left-panel relative min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 p-7 text-white shadow-[0_0_90px_rgba(182,0,168,0.18)] sm:rounded-[40px] sm:p-9 md:p-10">
          <div className="contact-orb orb-a" />
          <div className="contact-orb orb-b" />
          <div className="contact-shape shape-a" />
          <div className="contact-shape shape-b" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[.22em] text-white/70 backdrop-blur-md">
                <Sparkles className="size-4" />
                Product collaboration
              </div>
              <h3 className="max-w-xl text-[clamp(2.4rem,5vw,5rem)] font-black uppercase leading-none tracking-tight">
                I can’t wait to work with you.
              </h3>
              <p className="mt-6 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] font-light leading-relaxed text-white/72">
                I work with teams to turn business goals, user needs, and data insights into scalable digital products.
              </p>
            </div>

            <div>
              <div className="mb-8 flex flex-wrap gap-3">
                {["Available for product roles", "Product Strategy", "SaaS / MVAS / AI", "Based in Dhaka"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-[0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur-md"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid gap-3 text-white/78">
                <ContactLink icon={Mail} label={contact.email} href={`mailto:${contact.email}`} />
                <ContactLink icon={Linkedin} label="www.linkedin.com/in/saminmahmud" href={contact.linkedIn} />
                <ContactLink icon={Globe} label="www.kazisamin.com" href={contact.website} />
                <div className="flex items-center gap-3">
                  <MapPin className="size-5" />
                  <span>{contact.location}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <ContactForm
          form={form}
          validation={validation}
          status={status}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

function ContactForm({
  form,
  validation,
  status,
  setForm,
  handleSubmit
}: {
  form: FormState;
  validation: FormErrors;
  status: FormStatus;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <motion.form {...fadeUp} onSubmit={handleSubmit} className="contact-form-panel grid content-center gap-5 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-[40px] sm:p-8 md:p-10">
      <div>
        <p className="text-sm font-medium uppercase tracking-[.24em] text-[#D7E2EA]/45">Contact Form</p>
        <h3 className="mt-3 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
          Send an enquiry
        </h3>
        <p className="mt-4 max-w-2xl font-light leading-relaxed text-[#D7E2EA]/62">
          Share the product context, goal, or opportunity. I’ll reply with a practical next step.
        </p>
      </div>

      <InputField
        label="Your Name"
        name="name"
        value={form.name}
        error={validation.name}
        onChange={(value) => setForm((current) => ({ ...current, name: value }))}
      />
      <InputField
        label="Your Email"
        name="email"
        type="email"
        value={form.email}
        error={validation.email}
        onChange={(value) => setForm((current) => ({ ...current, email: value }))}
      />
      <InputField
        label="Your Subject"
        name="subject"
        value={form.subject}
        error={validation.subject}
        onChange={(value) => setForm((current) => ({ ...current, subject: value }))}
      />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#D7E2EA]/60">Your Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          rows={6}
          className="min-h-[160px] w-full resize-y rounded-2xl border border-white/10 bg-[#101318] px-5 py-4 text-[#D7E2EA] outline-none transition-all duration-300 placeholder:text-[#D7E2EA]/50 focus:border-[#B600A8]/70 focus:shadow-[0_0_35px_rgba(182,0,168,0.22)]"
          placeholder="Your Message"
        />
        {validation.message ? <span className="mt-2 block text-sm text-[#BBCCD7]">{validation.message}</span> : null}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ContactButton type="submit" disabled={status === "sending"} icon={<Send className="size-5" />}>
          {status === "sending" ? "Sending..." : "Send Enquiry"}
        </ContactButton>
        <GhostButton href={`mailto:${contact.email}`} className="border-white/15 bg-white/5 font-semibold normal-case tracking-wide hover:border-white/30 hover:bg-white/10">
          Email Me
        </GhostButton>
      </div>

      {status === "sent" ? <p className="text-mist/70">Message sent successfully. I will get back to you soon.</p> : null}
      {status === "error" ? <p className="text-[#BBCCD7]">Something went wrong. Please email me directly.</p> : null}

      <div className="grid gap-3 border-t border-white/10 pt-5 text-sm text-[#D7E2EA]/58 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Sparkles className="size-4 text-[#BBCCD7]" />
          <span>Usually replies within 24 hours</span>
        </div>
        <div className="flex items-center gap-3">
          <Send className="size-4 text-[#BBCCD7]" />
          <span>Open to product, SaaS, AI, MVAS, and platform roles</span>
        </div>
      </div>
    </motion.form>
  );
}

function MinimalFooter() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-white/10 px-5 py-10 text-[#D7E2EA]/55 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-semibold text-[#D7E2EA]">Kazi Samin Mahmud</p>
          <p className="mt-1 text-sm uppercase tracking-widest text-[#D7E2EA]/45">Product Manager</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a className="transition hover:text-[#D7E2EA]" href={`mailto:${contact.email}`}>
            Email: {contact.email}
          </a>
          <a className="transition hover:text-[#D7E2EA]" href={contact.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn: www.linkedin.com/in/saminmahmud
          </a>
          <a className="transition hover:text-[#D7E2EA]" href={contact.website} target="_blank" rel="noreferrer">
            Website: www.kazisamin.com
          </a>
          <span>Location: {contact.location}</span>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <FadeIn className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[.26em] text-mist/45">{eyebrow}</p>
      <h2 className="mt-5 max-w-6xl text-5xl font-black leading-none text-gradient lg:text-7xl">{title}</h2>
    </FadeIn>
  );
}

function ContactLink({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-center gap-3 transition hover:text-white"
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </a>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange
}: {
  label: string;
  name: keyof FormState;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#D7E2EA]/60">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#101318] px-5 py-4 text-[#D7E2EA] outline-none transition-all duration-300 placeholder:text-[#D7E2EA]/50 focus:border-[#B600A8]/70 focus:shadow-[0_0_35px_rgba(182,0,168,0.22)]"
        placeholder={label}
      />
      {error ? <span className="mt-2 block text-sm text-[#BBCCD7]">{error}</span> : null}
    </label>
  );
}

export default App;
