import { useMemo, useState } from "react";
import { ChevronRight, Dumbbell, Flame, HeartPulse } from "lucide-react";

type Trainer = {
  name: string;
  specialty: string;
  bio: string;
  initials: string;
  focus: string;
  experience: string;
  style: string;
  highlight: string;
  icon: typeof Dumbbell;
};

const trainers: Trainer[] = [
  {
    name: "Marcus Reid",
    specialty: "Strength & Powerlifting",
    bio: "Former competitive powerlifter with 10 years of coaching. Specializes in building raw strength for all fitness levels.",
    initials: "MR",
    focus: "Deadlift technique, compound lifts, progressive overload",
    experience: "10+ years coaching strength athletes and everyday lifters",
    style: "Direct, disciplined, and performance-driven",
    highlight:
      "Best for members chasing serious strength and measurable progress.",
    icon: Dumbbell,
  },
  {
    name: "Priya Nair",
    specialty: "Yoga & Mobility",
    bio: "Certified yoga instructor focused on injury prevention and flexibility. Combines mindfulness with physical performance.",
    initials: "PN",
    focus: "Mobility, flexibility, recovery, posture, and breath control",
    experience: "8+ years helping members move better and stay injury-free",
    style: "Calm, precise, and supportive",
    highlight:
      "Perfect if you want better movement, recovery, and body balance.",
    icon: HeartPulse,
  },
  {
    name: "Jordan Lee",
    specialty: "HIIT & Conditioning",
    bio: "High-energy coach with a background in athletic performance training. Known for pushing clients past what they thought was possible.",
    initials: "JL",
    focus: "Fat loss, endurance, explosive training, and conditioning",
    experience: "7+ years training clients for speed, stamina, and confidence",
    style: "Motivating, intense, and high-energy",
    highlight:
      "Ideal for members building stamina and chasing that dream body transformation.",
    icon: Flame,
  },
];

const TrainersSection = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer>(trainers[0]);

  const SelectedIcon = useMemo(() => selectedTrainer.icon, [selectedTrainer]);

  return (
    <section id="trainers" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Meet Our Coaches</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tap through our coaching team and find the trainer that matches your
            goals, energy, and training style.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-5">
            {trainers.map((trainer) => {
              const isActive = trainer.name === selectedTrainer.name;
              const TrainerIcon = trainer.icon;

              return (
                <button
                  key={trainer.name}
                  type="button"
                  onClick={() => setSelectedTrainer(trainer)}
                  className={`w-full rounded-lg border p-6 text-left transition-all ${
                    isActive
                      ? "border-primary bg-card shadow-lg shadow-primary/10 ring-1 ring-primary/30"
                      : "border-border bg-card hover:border-primary/60 hover:-translate-y-1"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {trainer.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold">{trainer.name}</h3>
                          <p className="text-primary text-sm font-semibold">
                            {trainer.specialty}
                          </p>
                        </div>
                        <TrainerIcon
                          className={`h-5 w-5 shrink-0 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground">
                        {trainer.bio}
                      </p>

                      <div
                        className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        View coach details
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isActive ? "translate-x-1" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-card rounded-lg border border-border p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-2xl font-bold text-primary">
                {selectedTrainer.initials}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                  Selected Coach
                </p>
                <h3 className="text-3xl font-bold">{selectedTrainer.name}</h3>
                <p className="text-muted-foreground">
                  {selectedTrainer.specialty}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 border border-border p-5 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <SelectedIcon className="h-5 w-5 text-primary" />
                <p className="font-semibold">
                  Why train with {selectedTrainer.name.split(" ")[0]}?
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedTrainer.highlight}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold mb-1">Coaching Focus</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTrainer.focus}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Experience</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTrainer.experience}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Training Style</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTrainer.style}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Coach Bio</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTrainer.bio}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                Expert Guidance
              </span>
              <span className="rounded-full bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
                Personalized Coaching
              </span>
              <span className="rounded-full bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground">
                Goal-Based Training
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
