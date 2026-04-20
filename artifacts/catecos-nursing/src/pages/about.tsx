import { useEffect } from "react";
import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, MapPin, Award, Users, Clock, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | Catecos Nursing Hub";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-4xl mx-auto">
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">About Us</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Redefining Home Healthcare<br /><span className="text-primary italic">in Kenya</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Catecos Nursing Hub was founded on a simple but powerful belief: every patient deserves world-class nursing care, delivered with compassion, in the comfort of their own home.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "500+", label: "Families Served" },
              { icon: Clock, value: "24/7", label: "Always Available" },
              { icon: Award, value: "10+", label: "Years Experience" },
              { icon: Star, value: "5.0", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Born from a Calling to Serve</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Catecos Nursing Hub was born out of a deeply personal mission — to transform how nursing care is delivered in Kenya. Our founder, a Registered Nurse with over a decade of clinical experience, witnessed firsthand how patients struggled to receive quality care at home after hospital discharge.</p>
                <p>She recognised that the journey to recovery doesn't end when you leave the hospital — it continues in your home, with your family. She built Catecos to bridge that gap: bringing the clinical excellence of a hospital directly to your doorstep.</p>
                <p>Since our founding, we have served hundreds of families across Utawala, Nairobi and beyond — building a reputation for reliability, clinical precision, and the kind of human warmth that machines can never replace.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/home-nursing-1.png", label: "Home Nursing" },
                { src: "/images/elderly-1.png", label: "Elderly Care" },
                { src: "/images/maternal-1.png", label: "Maternal Care" },
                { src: "/images/wound-1.png", label: "Wound Care" },
              ].map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs font-medium">{img.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">What Drives Us</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Our Mission, Vision & Values</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HeartPulse,
                title: "Our Mission",
                body: "To bring world-class healthcare to every family through personalised, compassionate, and professional nursing care delivered in the comfort of your home.",
                color: "bg-red-50",
                iconColor: "text-red-500",
              },
              {
                icon: ShieldCheck,
                title: "Our Vision",
                body: "To be Africa's most trusted home care provider — known for clinical excellence, unwavering reliability, and a deep human touch in every patient interaction.",
                color: "bg-blue-50",
                iconColor: "text-blue-500",
              },
              {
                icon: MapPin,
                title: "Our Promise",
                body: "We respond within 30 minutes, serve 24 hours a day and 7 days a week, and treat every patient as a member of our own family — because to us, they are.",
                color: "bg-green-50",
                iconColor: "text-green-500",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className={`${item.color} rounded-3xl p-8`}>
                <item.icon className={`h-10 w-10 ${item.iconColor} mb-6`} />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">The Catecos Difference</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "All nurses are Registered Nurses (RN) or Registered Midwives (RM)",
              "24/7 availability — we never close",
              "Affordable pricing with transparent rates",
              "30-minute response time for enquiries",
              "Personalised care plans for every patient",
              "Physician coordination and detailed progress reports",
              "Background-checked, vetted nursing professionals",
              "Serving all Nairobi and surrounding areas",
            ].map((point, i) => (
              <motion.div key={i} variants={fadeIn} className="flex items-start gap-3 p-4 rounded-2xl border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-6">
            "Our nurses are not just highly qualified — they are fundamentally patient-centered. We believe true healing requires both clinical precision and a human touch."
          </motion.blockquote>
          <p className="text-white/70 font-semibold">— Catecos Nursing Hub</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="rounded-full h-14 px-8 bg-white text-primary hover:bg-white/90 font-bold gap-2">
                Book a Nurse
              </Button>
            </Link>
            <Link href="/team">
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-white/40 text-white hover:bg-white/10">
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
