import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="text-primary uppercase tracking-[0.3em] text-sm font-semibold mb-6">
          No Excuses. Just Results.
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
          Push Your Limits.
          <br />
          Transform Your Body.
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          IronCore Fitness is your home for serious training, expert coaching,
          and a community that pushes you further every single day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold text-lg hover:scale-105 transition-transform"
          >
            Start Today
          </a>
          <a
            href="#classes"
            className="border border-foreground/30 text-foreground px-8 py-3 rounded-md font-bold text-lg hover:scale-105 hover:border-primary hover:text-primary transition-all"
          >
            See Our Classes
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
