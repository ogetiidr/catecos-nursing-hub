import { motion } from "framer-motion";
import { Phone, HeartPulse, ShieldCheck, Clock, ChevronRight, Activity, Baby, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2" data-testid="nav-logo">
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="font-serif font-bold text-xl md:text-2xl text-primary tracking-tight">
              Catecos Nursing Hub
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors" data-testid="nav-services">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors" data-testid="nav-about">About Us</a>
            <Button className="rounded-full shadow-md bg-primary hover:bg-primary/90 text-primary-foreground gap-2" data-testid="nav-cta">
              <Phone className="h-4 w-4" />
              0758867235
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('/hero-nurse.png')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/50 to-background" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                <Clock className="h-4 w-4" />
                Available 24/7 in Nairobi
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
                Compassionate Care,<br />
                <span className="text-primary italic">In the Comfort of Home.</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                We bring qualified, reliable, and expert nursing care directly to your doorstep. Because healing happens best where you feel most comfortable.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full text-base h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg hover:shadow-xl transition-all" data-testid="hero-call-btn">
                  <Phone className="h-5 w-5" />
                  Call 0758867235
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-primary/20 hover:bg-secondary text-foreground" data-testid="hero-services-btn">
                  Our Services
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[600px]"
            >
              <img 
                src="/hero-nurse.png" 
                alt="Compassionate nurse with elderly patient" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Certified Professionals</p>
                  <p className="text-sm text-muted-foreground">Experienced & trusted nurses</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center">
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Expert Medical Care</h3>
              <p className="text-muted-foreground text-sm">Qualified, experienced nurses you can trust with your loved ones.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center">
              <HeartPulse className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Deeply Human</h3>
              <p className="text-muted-foreground text-sm">Compassionate approach that treats patients like family, not just a chart.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex flex-col items-center">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground text-sm">Round-the-clock support whenever you need us, right in Nairobi.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Expert Care Offerings</h2>
            <p className="text-lg text-muted-foreground">We provide a comprehensive range of home health services tailored to your family's unique needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Home Nursing Care",
                desc: "Comprehensive nursing support for patients recovering at home, managing daily medical needs.",
                icon: Activity,
              },
              {
                title: "Post-Operative Care",
                desc: "Specialized care to ensure safe, comfortable recovery following surgical procedures.",
                icon: ShieldCheck,
              },
              {
                title: "Elderly Care",
                desc: "Compassionate companionship and medical monitoring for seniors in their golden years.",
                icon: UserCheck,
              },
              {
                title: "Maternal & Newborn Care",
                desc: "Expert support for new mothers and delicate care for their precious newborns.",
                icon: Baby,
              },
              {
                title: "Wound Dressing",
                desc: "Professional wound management and dressing changes to prevent infection and promote healing.",
                icon: HeartPulse,
              },
              {
                title: "Chronic Disease Management",
                desc: "Ongoing monitoring and care for conditions like diabetes, hypertension, and more.",
                icon: Activity,
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="group p-8 rounded-3xl bg-white border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <a href="#contact" className="inline-flex items-center text-sm font-bold text-primary group-hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-12 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src="/maternal-care.png" alt="Maternal and newborn care" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src="/post-op-care.png" alt="Post operative care" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src="/elderly-care.png" alt="Elderly care companion" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Our Mission & Vision</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                    <HeartPulse className="h-5 w-5" /> Mission
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To bring quality healthcare closer to families through personalized, compassionate, and professional care in the comfort of their homes.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> Vision
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become the leading home care provider in Nairobi, known for excellence, unwavering trust, and reliability in every interaction.
                  </p>
                </div>
              </div>
              <div className="mt-10 p-6 bg-accent rounded-2xl border border-accent-foreground/10">
                <p className="italic text-foreground font-serif text-lg">
                  "Our team is not just highly qualified and experienced — they are fundamentally patient-centered. We believe that true healing requires a human touch."
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[500px] rounded-3xl overflow-hidden bg-secondary">
              <img src="/hero-nurse.png" alt="Our caring team" className="absolute inset-0 w-full h-full object-cover object-left" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/hero-nurse.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/95" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to arrange care for your loved one?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-primary-foreground/80 mb-10">
            Contact us today for a consultation. We're available 24/7 across Nairobi.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="rounded-full text-lg h-16 px-10 bg-white text-primary hover:bg-white/90 gap-3 shadow-xl" data-testid="cta-call-btn">
              <Phone className="h-6 w-6" />
              Call 0758867235
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <HeartPulse className="h-8 w-8 text-primary" />
                <span className="font-serif font-bold text-xl tracking-tight">
                  Catecos Nursing Hub
                </span>
              </div>
              <p className="text-background/60 max-w-sm mb-6">
                Compassionate, Professional, Reliable Care — In the Comfort of Your Home. Serving families across Nairobi, Kenya.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-background/60 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#about" className="text-background/60 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-background/60 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-3 text-background/60">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 0758867235</li>
                <li className="flex items-center gap-2">Nairobi, Kenya</li>
                <li className="flex items-center gap-2 text-primary font-medium mt-4">Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-background/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Catecos Nursing Hub and Home Care Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
