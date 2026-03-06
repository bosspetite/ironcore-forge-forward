import { Clock, Users, Dumbbell, Apple } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Gym Access",
    desc: "Open every hour of every day, no restrictions. Train on your schedule, not ours.",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    desc: "Certified coaches who build personalized programs to match your exact goals.",
  },
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    desc: "State-of-the-art machines and free weights updated regularly.",
  },
  {
    icon: Apple,
    title: "Nutrition Guidance",
    desc: "Meal plans and supplement advice included with Pro and Elite memberships.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-section-alt">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">Why IronCore?</h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to reach your goals — all under one roof.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors group"
          >
            <f.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
