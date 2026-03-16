import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  interest: "",
  message: "",
};

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetFeedback = () => {
    setSuccess(false);
    setSubmitError("");
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.interest) {
      nextErrors.interest = "Please select an option.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (!validateForm()) {
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (
      !accessKey ||
      accessKey === "YOUR_ACCESS_KEY_HERE" ||
      (typeof accessKey === "string" && accessKey.trim() === "")
    ) {
      setSubmitError(
        "Contact form is not configured yet. Add your Web3Forms access key and restart the app.",
      );
      return;
    }

    setLoading(true);

    try {
      const payload = {
        access_key: accessKey,
        subject: `New Contact Form Submission - ${form.interest}`,
        name: form.name.trim(),
        email: form.email.trim(),
        interest: form.interest,
        message: form.message.trim(),
        from_name: "IronCore Fitness Website",
        botcheck: "",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: { success?: boolean; message?: string } = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Message could not be sent right now. Please try again in a moment.",
        );
      }

      setSuccess(true);
      setForm(initialFormState);
      setErrors({});
      window.setTimeout(() => setSuccess(false), 8000);
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "Unable to reach the contact service. Check your internet connection, browser privacy settings, or ad/script blockers and try again."
          : error instanceof Error
            ? error.message
            : "Message could not be sent right now. Please try again.";

      setSubmitError(message);
      console.error("Contact form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-4xl font-bold">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-lg border border-border bg-card p-8"
        >
          {success && (
            <div className="flex items-start gap-3 rounded-md border border-green-600/30 bg-green-600/20 p-4 text-sm text-green-400">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="mt-1 text-xs text-green-300/80">
                  Your message has been submitted. Check your inbox and spam
                  folder for any follow-up replies.
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="flex items-start gap-3 rounded-md border border-red-600/30 bg-red-600/20 p-4 text-sm text-red-400">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Error sending message</p>
                <p className="mt-1 text-xs text-red-300/80">{submitError}</p>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="name" className="sr-only">
              Your full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="w-full rounded-md border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className="w-full rounded-md border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="interest" className="sr-only">
              I&apos;m interested in...
            </label>
            <select
              id="interest"
              value={form.interest}
              onChange={(e) => {
                setForm({ ...form, interest: e.target.value });
                if (errors.interest) setErrors({ ...errors, interest: "" });
              }}
              className="w-full rounded-md border border-border bg-muted px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? "interest-error" : undefined}
            >
              <option value="">I&apos;m interested in...</option>
              <option>General Inquiry</option>
              <option>Membership Info</option>
              <option>Personal Training</option>
              <option>Class Schedule</option>
            </select>
            {errors.interest && (
              <p id="interest-error" className="mt-1 text-xs text-red-400">
                {errors.interest}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Your message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              rows={5}
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              className="w-full resize-none rounded-md border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-lg font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
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
