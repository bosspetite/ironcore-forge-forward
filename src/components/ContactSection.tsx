import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", interest: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email is required.";
    if (!form.interest) errs.interest = "Please select an option.";
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSuccess(true);
      setForm({ name: "", email: "", interest: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Get In Touch</h2>
          <p className="text-muted-foreground text-lg">
            Have questions? We'd love to hear from you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 border border-border space-y-5">
          {success && (
            <div className="bg-green-600/20 text-green-400 rounded-md p-3 text-sm text-center font-semibold">
              Thanks! We'll be in touch soon.
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <select
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">I'm interested in...</option>
              <option>General Inquiry</option>
              <option>Membership Info</option>
              <option>Personal Training</option>
              <option>Class Schedule</option>
            </select>
            {errors.interest && <p className="text-red-400 text-xs mt-1">{errors.interest}</p>}
          </div>
          <div>
            <textarea
              placeholder="Write your message here..."
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
