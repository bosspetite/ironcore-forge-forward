import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { handleAnchorClick } from "@/lib/smoothScroll";

const navLinks = ["Home", "Classes", "Trainers", "Pricing", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a 
          href="#home" 
          onClick={(e) => handleAnchorClick(e, "#home")}
          className="text-xl font-bold hover:opacity-80 transition-opacity"
          aria-label="IronCore Fitness Home"
        >
          <span className="text-primary">IronCore</span>{" "}
          <span className="text-foreground">Fitness</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleAnchorClick(e, `#${link.toLowerCase()}`)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <Link
            to="/social"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Community
          </Link>
          <ThemeToggle />
          <a
            href="#pricing"
            onClick={(e) => handleAnchorClick(e, "#pricing")}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Join Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  handleAnchorClick(e, `#${link.toLowerCase()}`);
                  setOpen(false);
                }}
                className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <Link
              to="/social"
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Community
            </Link>
            <ThemeToggle />
            <a
              href="#pricing"
              onClick={(e) => {
                handleAnchorClick(e, "#pricing");
                setOpen(false);
              }}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold"
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
