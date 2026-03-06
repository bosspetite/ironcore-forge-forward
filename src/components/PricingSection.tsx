import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["Access to gym floor (off-peak hours)", "Locker room access", "Mobile app access", "1 group class per week"],
    popular: false,
  },
  {
    name: "Basic",
    price: 29,
    features: ["Access to gym floor", "Locker room access", "2 group classes per week", "Mobile app access"],
    popular: false,
  },
  {
    name: "Pro",
    price: 59,
    features: ["Everything in Basic", "Unlimited group classes", "1 personal training session/month", "Nutrition guidance", "Guest pass (1/month)"],
    popular: true,
  },
  {
    name: "Elite",
    price: 99,
    features: ["Everything in Pro", "Unlimited personal training", "Custom meal plan", "Priority class booking", "Exclusive member events"],
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">Simple Pricing</h2>
        <p className="text-muted-foreground text-lg">
          No hidden fees. No contracts. Just results.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`bg-card rounded-lg p-8 border flex flex-col ${
              p.popular
                ? "border-primary scale-105 relative"
                : "border-border"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
            <div className="mb-6">
              <span className="text-5xl font-black">{p.price === 0 ? "Free" : `$${p.price}`}</span>
              {p.price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
            </div>
            <hr className="border-border mb-6" />
            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`block text-center py-3 rounded-md font-bold transition-all hover:scale-105 ${
                p.popular
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
