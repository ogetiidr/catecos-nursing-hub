import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Youtube, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PHONE, EMAIL, YOUTUBE, WHATSAPP, SERVICES } from "@/lib/constants";
import { useCreateInquiry } from "@workspace/api-client-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const { toast } = useToast();
  const mutation = useCreateInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });

  useEffect(() => {
    document.title = "Contact Us | Catecos Nursing Hub";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    mutation.mutate(
      { data: { name: form.name, phone: form.phone, email: form.email || null, service: form.service || null, message: form.message } },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => toast({ title: "Failed to send. Please call us directly.", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">Get In Touch</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-serif font-bold mb-4">
              We're Here to <span className="text-primary italic">Help You</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground leading-relaxed">
              Reach out to us any way you prefer — call, email, WhatsApp, or fill in the form. We respond within 30 minutes, 24/7.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-5">
              <motion.h2 variants={fadeIn} className="text-2xl font-serif font-bold mb-6">Contact Information</motion.h2>
              {[
                {
                  icon: Phone, href: `tel:${PHONE}`, label: PHONE, sub: "Available 24 hours, 7 days a week",
                  bg: "bg-primary", iconColor: "text-white",
                },
                {
                  icon: Mail, href: `mailto:${EMAIL}`, label: EMAIL, sub: "Email us anytime",
                  bg: "bg-primary/10", iconColor: "text-primary",
                },
                {
                  icon: MapPin, href: "#", label: "Utawala, Nairobi, Kenya", sub: "Serving all Nairobi and surrounding areas",
                  bg: "bg-primary/10", iconColor: "text-primary",
                },
                {
                  icon: Youtube, href: YOUTUBE, label: "@CateCos-u1f", sub: "Watch our YouTube channel",
                  bg: "bg-red-50", iconColor: "text-red-600",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  variants={fadeIn}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-border/40 hover:shadow-md hover:border-primary/20 transition-all group"
                >
                  <div className={`h-12 w-12 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                    <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.sub}</p>
                  </div>
                </motion.a>
              ))}

              <motion.a
                variants={fadeIn}
                href={`https://wa.me/${WHATSAPP}?text=Hello%20Catecos%20Nursing%20Hub%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl border border-green-200 hover:shadow-md transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white"><path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.802 1.787 6.82L2 30l7.368-1.763A13.948 13.948 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm6.367 19.912c-.35-.175-2.063-1.018-2.383-1.133-.32-.116-.553-.175-.786.175-.232.35-.9 1.133-1.104 1.366-.204.232-.407.261-.757.087-.35-.175-1.477-.544-2.812-1.735-1.04-.926-1.74-2.07-1.944-2.42-.204-.35-.022-.539.153-.713.157-.157.35-.407.525-.611.175-.204.233-.35.35-.583.116-.232.058-.436-.029-.611-.087-.175-.786-1.895-1.077-2.595-.283-.682-.571-.589-.786-.6l-.668-.011c-.233 0-.611.087-.931.436-.32.35-1.222 1.194-1.222 2.914s1.251 3.38 1.426 3.613c.175.232 2.463 3.76 5.97 5.27.834.36 1.485.575 1.993.736.837.267 1.6.229 2.203.139.672-.1 2.063-.843 2.355-1.658.291-.815.291-1.514.204-1.659-.087-.146-.32-.233-.67-.407z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-green-800">WhatsApp</p>
                  <p className="text-sm text-green-700">Chat with us instantly on WhatsApp</p>
                </div>
              </motion.a>

              <motion.div variants={fadeIn} className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-bold">Working Hours</p>
                </div>
                <p className="text-muted-foreground text-sm">We are available <strong>24 hours a day, 7 days a week</strong> — including weekends and public holidays. Emergencies are always attended to immediately.</p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl shadow-xl border border-border/40 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Message Received!</h3>
                  <p className="text-muted-foreground mb-8">Thank you for reaching out. Our team will contact you within 30 minutes.</p>
                  <a href={`tel:${PHONE}`}>
                    <Button className="rounded-full gap-2"><Phone className="h-4 w-4" /> Call for Immediate Help</Button>
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Full Name *</label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-xl h-12" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07XXXXXXXX" className="rounded-xl h-12" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email (optional)</label>
                        <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" type="email" className="rounded-xl h-12" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Service Needed</label>
                        <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full h-12 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Select a service...</option>
                          {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Message *</label>
                      <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your care needs..." className="rounded-xl min-h-[120px]" required />
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-full h-12 gap-2" disabled={mutation.isPending}>
                      {mutation.isPending ? "Sending..." : <><Send className="h-5 w-5" /> Send Message</>}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
