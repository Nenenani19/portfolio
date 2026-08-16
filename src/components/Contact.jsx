import { useState } from "react";
import { Github, Linkedin, Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import profile from "../config/profile";
import SplitHeading from "./SplitHeading";
import "./Contact.css";

const isConfigured = (value) => Boolean(value) && !value.startsWith("YOUR_");

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorDetail, setErrorDetail] = useState("");

  const emailReady = isConfigured(profile.email);
  const emailjsReady =
    isConfigured(profile.emailjs?.serviceId) &&
    isConfigured(profile.emailjs?.templateId) &&
    isConfigured(profile.emailjs?.publicKey);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const sendViaMailto = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name || "Anonymous"} (${form.email || "no email given"})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailReady) return;

    // Preferred path: send the email for real, in-app, via EmailJS.
    if (emailjsReady) {
      setStatus("sending");
      setErrorDetail("");
      try {
        const emailjs = (await import("@emailjs/browser")).default;

        // Different EmailJS templates use different variable names for the
        // same fields (name/from_name, email/reply_to, etc). Sending all of
        // the common ones means this works regardless of how the template
        // was built, without you having to rename anything.
        const templateParams = {
          name: form.name,
          from_name: form.name,
          user_name: form.name,
          email: form.email,
          from_email: form.email,
          user_email: form.email,
          reply_to: form.email,
          message: form.message,
          to_email: profile.email,
        };

        // The public key is passed as a plain string here (per EmailJS's
        // own docs) rather than wrapped in an options object — wrapping it
        // is what was silently breaking auth and causing every send to fail.
        await emailjs.send(
          profile.emailjs.serviceId,
          profile.emailjs.templateId,
          templateParams,
          profile.emailjs.publicKey
        );
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } catch (err) {
        console.error("EmailJS send failed:", err);
        setErrorDetail(err?.text || err?.message || "");
        setStatus("error");
      }
      return;
    }

    // Fallback: no EmailJS configured yet, open the visitor's mail client.
    sendViaMailto();
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__status">
          <span className="contact__dot" /> Open to learning &amp; collaboration
        </div>

        <SplitHeading as="h2" className="contact__heading">
          Let's build something.
        </SplitHeading>
        <p className="section-sub">
          Open to learning, collaboration, internships, and opportunities to build meaningful
          technology.
        </p>

        <div className="contact__grid">
          <div className="contact__links">
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="link">
              <Github size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="link">
              <Linkedin size={16} /> LinkedIn
            </a>
            {emailReady ? (
              <a href={`mailto:${profile.email}`} className="btn btn-ghost" data-cursor="link">
                <Mail size={16} /> Email
              </a>
            ) : (
              <span className="btn btn-ghost btn--disabled" title="Add your email in src/config/profile.js">
                <Mail size={16} /> Email (set in config)
              </span>
            )}
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
            </div>
            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              data-cursor="link"
              disabled={!emailReady || status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="contact__spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="contact__feedback contact__feedback--ok">
                <CheckCircle2 size={15} /> Message sent — thanks for reaching out!
              </p>
            )}
            {status === "error" && (
              <p className="contact__feedback contact__feedback--error">
                <AlertCircle size={15} />
                Something went wrong{errorDetail ? ` (${errorDetail})` : ""}. Try again, or use the
                email link above.
              </p>
            )}

            {!emailReady && (
              <p className="contact__note">
                Add your address in <code>src/config/profile.js</code> to enable this form.
              </p>
            )}
            {emailReady && !emailjsReady && (
              <p className="contact__note">
                This currently opens your email client. Add your EmailJS keys in{" "}
                <code>src/config/profile.js</code> to send messages directly, without leaving the page.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
