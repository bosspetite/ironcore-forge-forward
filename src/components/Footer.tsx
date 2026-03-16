import { smoothScrollTo } from "@/lib/smoothScroll";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/emmypetite20?igsh=MW1sNDB3MGNwOGJsMw==",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@BasseyObeys",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@raymie_1",
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/BasseyObey15213",
  },
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="border-t border-border bg-background py-14">
    <div className="container mx-auto px-4">
      <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <p className="mb-2 text-xl font-bold">
            <span className="text-primary">IronCore</span> Fitness
          </p>
          <p className="text-sm text-muted-foreground">
            No excuses. Just results.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(link.href);
                  }}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold">Follow Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                  aria-label={`${social.name} profile`}
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="mb-6 border-border" />

      <p className="text-center text-xs text-muted-foreground">
        © 2025 IronCore Fitness. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
