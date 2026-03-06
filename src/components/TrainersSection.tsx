const trainers = [
  {
    name: "Marcus Reid",
    specialty: "Strength & Powerlifting",
    bio: "Former competitive powerlifter with 10 years of coaching. Specializes in building raw strength for all fitness levels.",
    initials: "MR",
  },
  {
    name: "Priya Nair",
    specialty: "Yoga & Mobility",
    bio: "Certified yoga instructor focused on injury prevention and flexibility. Combines mindfulness with physical performance.",
    initials: "PN",
  },
  {
    name: "Jordan Lee",
    specialty: "HIIT & Conditioning",
    bio: "High-energy coach with a background in athletic performance training. Known for pushing clients past what they thought was possible.",
    initials: "JL",
  },
];

const TrainersSection = () => (
  <section id="trainers" className="py-20 bg-section-alt">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">Meet Your Coaches</h2>
        <p className="text-muted-foreground text-lg">
          Real trainers. Real results. Dedicated to your success.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((t) => (
          <div
            key={t.name}
            className="bg-card rounded-lg p-8 border border-border hover:border-primary transition-colors text-center"
          >
            <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-muted-foreground">
              {t.initials}
            </div>
            <h3 className="text-xl font-bold mb-1">{t.name}</h3>
            <p className="text-primary text-sm font-semibold mb-3">{t.specialty}</p>
            <p className="text-muted-foreground text-sm">{t.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrainersSection;
