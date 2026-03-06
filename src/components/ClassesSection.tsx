const classes = [
  { name: "HIIT Training", desc: "High intensity intervals to burn fat fast.", schedule: "Mon / Wed / Fri at 6:00 AM", level: "Advanced" },
  { name: "Strength & Conditioning", desc: "Build raw power and muscular endurance.", schedule: "Tue / Thu at 7:00 AM", level: "Intermediate" },
  { name: "Yoga Flow", desc: "Improve flexibility, balance, and mental clarity.", schedule: "Mon / Wed at 8:00 AM", level: "Beginner" },
  { name: "Cycling", desc: "High-energy indoor cycling for cardio and leg strength.", schedule: "Tue / Thu / Sat at 6:30 AM", level: "Intermediate" },
  { name: "Boxing Fundamentals", desc: "Learn technique, footwork, and build full-body fitness.", schedule: "Wed / Fri at 5:30 PM", level: "Beginner" },
  { name: "Powerlifting", desc: "Focused squat, bench, and deadlift programming.", schedule: "Mon / Thu at 5:00 PM", level: "Advanced" },
];

const badgeColor: Record<string, string> = {
  Beginner: "bg-green-600/20 text-green-400",
  Intermediate: "bg-yellow-600/20 text-yellow-400",
  Advanced: "bg-red-600/20 text-red-400",
};

const ClassesSection = () => (
  <section id="classes" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">Our Classes</h2>
        <p className="text-muted-foreground text-lg">
          From beginner to advanced — we have a class for every level.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div
            key={c.name}
            className="bg-card rounded-lg p-6 border border-border hover:border-t-primary hover:border-t-2 hover:-translate-y-1 transition-all"
          >
            <h3 className="text-xl font-bold mb-2">{c.name}</h3>
            <p className="text-muted-foreground text-sm mb-3">{c.desc}</p>
            <p className="text-xs text-muted-foreground mb-3">{c.schedule}</p>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[c.level]}`}>
              {c.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ClassesSection;
