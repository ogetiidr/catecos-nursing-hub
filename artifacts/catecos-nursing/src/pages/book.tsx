import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, CheckCircle, Send, Calendar, MapPin, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SERVICES, PHONE, WHATSAPP } from "@/lib/constants";
import { useCreateInquiry } from "@workspace/api-client-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function BookPage() {
  const { toast } = useToast();
  const mutation = useCreateInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    service: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    document.title = "Book a Nurse | Catecos Nursing Hub";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.location) {
      toast({ title: "Please fill in your name, phone, and location.", variant: "destructive" });
      return;
    }
    const message = `Booking Request:\nLocation: ${form.location}\nPreferred Date: ${form.date || "Flexible"}\nNotes: ${form.notes || "None"}`;
    mutation.mutate(
      { data: { name: form.name, phone: form.phone, email: null, service: form.service || null, message } },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => toast({ title: "Submission failed. Please call us directly.", variant: "destructive" }),
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
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">Online Booking</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Book a Nurse <span className="text-primary italic">Today</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fill in the form below and our team will confirm your booking within 30 minutes. Or call us directly for immediate assistance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Sidebar Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 space-y-6">
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-serif font-bold mb-4">How It Works</h2>
                <div className="space-y-5">
                  {[
                    { step: "1", title: "Submit Your Booking", body: "Fill in the form with your name, phone, location, and preferred service." },
                    { step: "2", title: "We Confirm in 30 Min", body: "Our team reviews your request and calls you within 30 minutes to confirm details." },
                    { step: "3", title: "Nurse Visits You", body: "A qualified nurse is dispatched to your home at your preferred time." },
                    { step: "4", title: "Quality Care Delivered", body: "Receive professional, personalised nursing care in the comfort of your home." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-bold mb-0.5">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Need Immediate Help?
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Don't wait — call us now or message us on WhatsApp. We're available 24 hours a day, 7 days a week.</p>
                <div className="flex flex-col gap-3">
                  <a href={`tel:${PHONE}`}>
                    <Button className="rounded-full w-full gap-2">
                      <Phone className="h-4 w-4" /> Call {PHONE}
                    </Button>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20nurse.`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="rounded-full w-full gap-2 border-green-500/40 text-green-700 hover:bg-green-50">
                      <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current"><path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.802 1.787 6.82L2 30l7.368-1.763A13.948 13.948 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm6.367 19.912c-.35-.175-2.063-1.018-2.383-1.133-.32-.116-.553-.175-.786.175-.232.35-.9 1.133-1.104 1.366-.204.232-.407.261-.757.087-.35-.175-1.477-.544-2.812-1.735-1.04-.926-1.74-2.07-1.944-2.42-.204-.35-.022-.539.153-.713.157-.157.35-.407.525-.611.175-.204.233-.35.35-.583.116-.232.058-.436-.029-.611-.087-.175-.786-1.895-1.077-2.595-.283-.682-.571-.589-.786-.6l-.668-.011c-.233 0-.611.087-.931.436-.32.35-1.222 1.194-1.222 2.914s1.251 3.38 1.426 3.613c.175.232 2.463 3.76 5.97 5.27.834.36 1.485.575 1.993.736.837.267 1.6.229 2.203.139.672-.1 2.063-.843 2.355-1.658.291-.815.291-1.514.204-1.659-.087-.146-.32-.233-.67-.407z" /></svg>
                      WhatsApp Us
                    </Button>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Booking Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-border/40 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Booking Request Received!</h3>
                  <p className="text-muted-foreground mb-2">Thank you, <strong>{form.name}</strong>. We'll call you at <strong>{form.phone}</strong> within 30 minutes to confirm your booking.</p>
                  <p className="text-muted-foreground mb-8 text-sm">Need immediate assistance? Call us right now.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`tel:${PHONE}`}>
                      <Button className="rounded-full gap-2"><Phone className="h-4 w-4" /> Call Now</Button>
                    </a>
                    <Button variant="outline" className="rounded-full" onClick={() => setSubmitted(false)}>
                      Book Another
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 block">
                          <User className="h-4 w-4 text-primary" /> Full Name *
                        </label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="rounded-xl h-12" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 block">
                          <Phone className="h-4 w-4 text-primary" /> Phone Number *
                        </label>
                        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07XXXXXXXX" className="rounded-xl h-12" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 block">
                        <MapPin className="h-4 w-4 text-primary" /> Your Location / Address *
                      </label>
                      <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Utawala, Nairobi" className="rounded-xl h-12" required />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Type of Service</label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full h-12 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select a service...</option>
                          {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5 block">
                          <Calendar className="h-4 w-4 text-primary" /> Preferred Date
                        </label>
                        <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl h-12" min={new Date().toISOString().split("T")[0]} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Additional Notes</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Any specific care requirements, patient condition, or questions..."
                        className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[110px] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <Button type="submit" size="lg" className="rounded-full h-12 gap-2" disabled={mutation.isPending}>
                        {mutation.isPending ? "Submitting..." : <><Send className="h-4 w-4" /> Submit Booking</>}
                      </Button>
                      <a href={`tel:${PHONE}`}>
                        <Button type="button" variant="outline" size="lg" className="rounded-full h-12 gap-2 w-full border-primary/30">
                          <Phone className="h-4 w-4" /> Call Instead
                        </Button>
                      </a>
                    </div>

                    <p className="text-xs text-muted-foreground text-center pt-1">
                      We respect your privacy. Your information is used only to process your booking.
                    </p>
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
