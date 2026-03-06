import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "IronCore completely changed how I train. Lost 30 pounds in 4 months and finally feel confident in the gym.",
    name: "Denise W.",
  },
  {
    text: "The trainers here actually care. Marcus built me a program that finally got me deadlifting 400 pounds.",
    name: "Trevor S.",
  },
  {
    text: "I was nervous joining as a beginner but the community here is so welcoming. Priya's yoga class is incredible.",
    name: "Amara O.",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-section-alt">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-3">What Our Members Say</h2>
        <p className="text-muted-foreground text-lg">
          Real people. Real transformations.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card rounded-lg p-8 border border-border">
            <Quote className="w-8 h-8 text-primary mb-4" />
            <p className="italic text-foreground/90 mb-6">"{t.text}"</p>
            <p className="font-bold text-sm mb-2">— {t.name}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
