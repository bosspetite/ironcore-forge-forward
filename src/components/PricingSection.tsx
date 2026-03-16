import { Check } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const plans = [
  {
    name: "Free",
    priceLabel: "$0",
    billingLabel: "/month",
    features: [
      "Access to gym floor (off-peak hours)",
      "Locker room access",
      "Mobile app access",
      "1 group class per week",
    ],
    popular: false,
  },
  {
    name: "Basic",
    priceLabel: "$29",
    billingLabel: "/month",
    features: [
      "Access to gym floor",
      "Locker room access",
      "2 group classes per week",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "Pro",
    priceLabel: "$59",
    billingLabel: "/month",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "1 personal training session/month",
      "Nutrition guidance",
      "Guest pass (1/month)",
    ],
    popular: true,
  },
  {
    name: "Elite",
    priceLabel: "$99",
    billingLabel: "/month",
    features: [
      "Everything in Pro",
      "Unlimited personal training",
      "Custom meal plan",
      "Priority class booking",
      "Exclusive member events",
    ],
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">Simple Pricing</h2>
        <p className="text-muted-foreground text-lg">
          No hidden fees. No contracts. Just results.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex h-full flex-col rounded-lg border bg-card p-6 lg:p-7 ${
              plan.popular
                ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary))] lg:-translate-y-1"
                : "border-border"
            }`}
          >
            {plan.popular && (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                Most Popular
              </span>
            )}

            <div className="mb-5">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1.5">
                <span className="text-4xl lg:text-5xl font-black leading-none">
                  {plan.priceLabel}
                </span>
                <span className="text-sm text-muted-foreground pb-1">
                  {plan.billingLabel}
                </span>
              </div>
            </div>

            <hr className="border-border mb-5" />

            <ul className="mb-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => smoothScrollTo("#contact")}
              className={`mt-auto block w-full rounded-md py-3 text-center font-bold transition-all hover:scale-[1.02] ${
                plan.popular
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
