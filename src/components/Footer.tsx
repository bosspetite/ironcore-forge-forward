import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-background border-t border-border py-14">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <p className="text-xl font-bold mb-2">
            <span className="text-primary">IronCore</span> Fitness
          </p>
          <p className="text-muted-foreground text-sm">
            Built for those who are serious about change.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Home", "Classes", "Trainers", "Pricing", "Contact"].map((l) => (
              <li key={l}>
                <a 
                  href={`#${l.toLowerCase()}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(`#${l.toLowerCase()}`);
                    if (element) {
                      const offset = 64;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-primary transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Follow Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/social" className="hover:text-primary transition-colors">Community Feed</Link>
            </li>
            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-border mb-6" />
      <p className="text-center text-xs text-muted-foreground">
        © 2025 IronCore Fitness. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
