import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", interest: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setErrors({});
    
    // Validation
    const errs: Record<string, string> = {};
    if (!form.name.trim()) {
      errs.name = "Name is required.";
    }
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.interest) {
      errs.interest = "Please select an option.";
    }
    if (!form.message.trim()) {
      errs.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    setLoading(true);
    setSubmitError("");
    
    try {
      // Get Web3Forms access key from environment variable
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
      
      if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
        throw new Error("Contact form is not configured. Please set up your Web3Forms access key.");
      }

      // Create form data with all required fields
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("subject", `New Contact Form Submission - ${form.interest}`);
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("interest", form.interest);
      formData.append("message", form.message.trim());
      formData.append("from_name", "IronCore Fitness Website");
      
      // Add honeypot for spam protection
      formData.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", interest: "", message: "" });
        setErrors({});
        // Keep success message visible longer
        setTimeout(() => setSuccess(false), 8000);
      } else {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "Failed to send message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
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
            <div className="bg-green-600/20 border border-green-600/30 text-green-400 rounded-md p-4 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-green-300/80 text-xs mt-1">We'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}
          {submitError && (
            <div className="bg-red-600/20 border border-red-600/30 text-red-400 rounded-md p-4 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error sending message</p>
                <p className="text-red-300/80 text-xs mt-1">{submitError}</p>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="name" className="sr-only">Your full name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Your email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="interest" className="sr-only">I'm interested in...</label>
            <select
              id="interest"
              value={form.interest}
              onChange={(e) => {
                setForm({ ...form, interest: e.target.value });
                if (errors.interest) setErrors({ ...errors, interest: "" });
              }}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? "interest-error" : undefined}
            >
              <option value="">I'm interested in...</option>
              <option>General Inquiry</option>
              <option>Membership Info</option>
              <option>Personal Training</option>
              <option>Class Schedule</option>
            </select>
            {errors.interest && <p id="interest-error" className="text-red-400 text-xs mt-1">{errors.interest}</p>}
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Your message</label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              rows={5}
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
