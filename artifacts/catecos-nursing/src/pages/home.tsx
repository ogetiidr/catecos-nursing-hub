import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, HeartPulse, ShieldCheck, Clock, Activity,
  Star, ChevronRight, ChevronLeft, CheckCircle, X, DollarSign, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useListTestimonials } from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SERVICES, PHONE } from "@/lib/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} care image ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Previous image">
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button onClick={() => setCurrent((c) => (c + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Next image">
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-2 bg-white/60"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useListTestimonials();
  const defaultTestimonials = [
    { id: 1, name: "Grace Wanjiku", role: "Daughter of patient", message: "The nurse who cared for my mother was exceptional — professional, kind, and so thorough. Catecos gave us peace of mind during a very stressful time.", rating: 5 },
    { id: 2, name: "Joseph Kamau", role: "Patient, post-surgery", message: "After my knee surgery, I was worried about managing at home. The Catecos team made recovery smooth and comfortable. Truly world-class service.", rating: 5 },
    { id: 3, name: "Mary Achieng", role: "New mother", message: "The maternal care nurse was a blessing. She helped me breastfeed confidently and kept my baby healthy. I recommend Catecos to every new mother in Nairobi.", rating: 5 },
  ];
  const list = isLoading ? [] : testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">Real stories from real families we've served across Nairobi.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {list.map((t: any, i: number) => (
            <motion.div key={t.id ?? i} variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-sm border border-border/40 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating ?? 5 }).map((_, j) => <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">"{t.message}"</p>
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center">
          <Link href="/testimonials">
            <Button variant="outline" className="rounded-full gap-2 border-primary/30 hover:bg-primary hover:text-white transition-all">
              Read All Reviews <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);

  useEffect(() => {
    document.title = "Catecos Nursing Hub | Professional Home Nursing Care in Nairobi";
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-primary to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Clock className="h-4 w-4" /> Utawala, Nairobi · Available 24/7
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
                The World's Best<br />
                <span className="text-primary italic">Home Care,</span><br />
                <span className="text-2xl md:text-4xl font-normal text-muted-foreground">Right at Your Doorstep.</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Certified, compassionate nursing care delivered to your home in Utawala, Nairobi and across Kenya. Because true healing happens where you feel most comfortable.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/book" data-testid="hero-book-btn">
                  <Button size="lg" className="rounded-full text-base h-14 px-8 bg-primary hover:bg-primary/90 text-white gap-2 shadow-xl hover:shadow-2xl transition-all">
                    Book a Nurse <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href={`tel:${PHONE}`} data-testid="hero-call-btn">
                  <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-primary/20 hover:bg-primary/5 text-foreground gap-2">
                    <Phone className="h-5 w-5" /> Call {PHONE}
                  </Button>
                </a>
              </motion.div>
              <motion.div variants={fadeIn} className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["/images/elderly-1.png", "/images/maternal-1.png", "/images/home-nursing-1.png"].map((src, i) => (
                    <img key={i} src={src} alt="Happy patient" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">Trusted by 500+ families in Nairobi</p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img src="/images/hero-main.png" alt="Professional nurse visiting patient at home" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[220px]">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Certified Nurses</p>
                  <p className="text-xs text-muted-foreground">All nurses RN/RM qualified</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-white rounded-2xl shadow-xl p-4">
                <Clock className="h-6 w-6 mb-1" />
                <p className="font-bold text-sm">24/7</p>
                <p className="text-xs opacity-80">Always available</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights — 24/7, Quality, Affordable */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "24/7 Care",
                body: "Our nurses are on call around the clock — day, night, weekends and public holidays. We never close. Emergencies are always attended to immediately.",
                color: "bg-teal-50 border-teal-100",
                iconBg: "bg-teal-100",
                iconColor: "text-teal-600",
              },
              {
                icon: Award,
                title: "Quality Service",
                body: "Every nurse we deploy is a Registered Nurse (RN) or Registered Midwife (RM) with proven clinical expertise. We maintain strict quality standards and ongoing clinical supervision.",
                color: "bg-blue-50 border-blue-100",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
              },
              {
                icon: DollarSign,
                title: "Affordable Rates",
                body: "World-class home nursing care shouldn't cost a fortune. We offer transparent, competitive pricing with no hidden fees — making quality care accessible to every family.",
                color: "bg-green-50 border-green-100",
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className={`${item.color} border rounded-3xl p-8`}>
                <div className={`${item.iconBg} h-14 w-14 rounded-2xl flex items-center justify-center mb-5`}>
                  <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-gray-50 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: ShieldCheck, label: "Expert Care", sub: "Registered Nurses" },
              { icon: HeartPulse, label: "Compassionate", sub: "Patient-centered" },
              { icon: Clock, label: "24/7 Available", sub: "Always here for you" },
              { icon: Activity, label: "500+ Families", sub: "Served across Nairobi" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-bold">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Comprehensive Home Healthcare</h2>
            <p className="text-lg text-muted-foreground">We offer a full spectrum of professional nursing and care services tailored to every patient's unique needs.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-border/40 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-4 left-4 h-10 w-10 rounded-xl bg-gradient-to-br ${service.color} backdrop-blur-sm flex items-center justify-center border border-white/30`}>
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.shortDesc}</p>
                  <div className="flex items-center text-primary text-sm font-semibold">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full gap-2 border-primary/30 hover:bg-primary hover:text-white transition-all">
                View All Services <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setSelectedService(null); }}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white px-8 py-4 border-b border-border/40 flex items-center justify-between rounded-t-3xl z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedService.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{selectedService.title}</h2>
                </div>
                <button onClick={() => setSelectedService(null)} className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8">
                <ImageCarousel images={selectedService.images} title={selectedService.title} />
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">About This Service</h3>
                    {selectedService.description.split("\n\n").map((para, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-3">{para}</p>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3">What's Included</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg">Need {selectedService.title}?</p>
                      <p className="text-muted-foreground text-sm">Book online or call us — we respond within 30 minutes.</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href="/book" onClick={() => setSelectedService(null)}>
                        <Button className="rounded-full">Book Online</Button>
                      </Link>
                      <a href={`tel:${PHONE}`}>
                        <Button variant="outline" className="rounded-full gap-2"><Phone className="h-4 w-4" /> Call</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">About Us</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Redefining Home Healthcare in Kenya</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">To bring world-class healthcare to every family through personalised, compassionate, and professional nursing care delivered in the comfort of your home.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">To be Africa's most trusted home care provider — known for clinical excellence, unwavering reliability, and a deep human touch in every patient interaction.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-teal-50 rounded-2xl border border-primary/10">
                <p className="italic text-foreground font-serif text-lg leading-relaxed">
                  "Our nurses are not just highly qualified — they are fundamentally patient-centered. We believe true healing requires both clinical precision and a human touch."
                </p>
                <p className="text-sm text-muted-foreground mt-3 font-semibold">— Catecos Nursing Hub</p>
              </div>
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" className="rounded-full gap-2 border-primary/30 hover:bg-primary hover:text-white transition-all">
                    Read Our Full Story <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/home-nursing-1.png", label: "Home Nursing" },
                { src: "/images/elderly-1.png", label: "Elderly Care" },
                { src: "/images/maternal-1.png", label: "Maternal Care" },
                { src: "/images/wound-1.png", label: "Wound Dressing" },
              ].map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{img.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/hero-main.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Trusted Care, Anytime You Need It
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-white/80 mb-10">
            Join hundreds of families in Nairobi who trust Catecos for exceptional home nursing care.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" data-testid="cta-book-btn">
              <Button size="lg" className="rounded-full text-lg h-16 px-10 bg-white text-primary hover:bg-white/90 gap-3 shadow-xl font-bold">
                Book a Nurse
              </Button>
            </Link>
            <a href={`tel:${PHONE}`} data-testid="cta-call-btn">
              <Button size="lg" variant="outline" className="rounded-full text-lg h-16 px-10 border-white/40 text-white hover:bg-white/10 gap-3">
                <Phone className="h-6 w-6" /> Call {PHONE}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
