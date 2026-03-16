import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { handleAnchorClick } from "@/lib/smoothScroll";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 110;

      let currentSection = "home";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          currentSection = id;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const isActive = (href: string) => activeSection === href.replace("#", "");

  const desktopLinkClasses = (href: string) =>
    [
      "relative text-sm font-semibold transition-all duration-200",
      "after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:rounded-full after:bg-primary after:transition-all after:duration-200",
      isActive(href)
        ? "text-primary after:w-full"
        : "text-muted-foreground hover:text-primary after:w-0 hover:after:w-full",
    ].join(" ");

  const mobileLinkClasses = (href: string) =>
    [
      "w-full rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 border",
      isActive(href)
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
        : "border-transparent text-muted-foreground hover:text-primary hover:border-border hover:bg-muted",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a
          href="#home"
          onClick={(e) => handleAnchorClick(e, "#home")}
          className="text-xl font-bold transition-opacity hover:opacity-80"
          aria-label="IronCore Fitness Home"
        >
          <span className="text-primary">IronCore</span>{" "}
          <span className="text-foreground">Fitness</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={desktopLinkClasses(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}

          <ThemeToggle />

          <a
            href="#pricing"
            onClick={(e) => handleAnchorClick(e, "#pricing")}
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Join Now
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className={`rounded-md p-2 transition-colors ${
              open
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-b border-border bg-background/95 backdrop-blur-md lg:hidden"
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleAnchorClick(e, link.href);
                  setOpen(false);
                }}
                className={mobileLinkClasses(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                <span className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {isActive(link.href) && (
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  )}
                </span>
              </a>
            ))}

            <a
              href="#pricing"
              onClick={(e) => {
                handleAnchorClick(e, "#pricing");
                setOpen(false);
              }}
              className="mt-2 w-full rounded-lg bg-primary px-4 py-3 text-center font-semibold text-primary-foreground shadow-md shadow-primary/20"
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
