import { useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Phone, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PHONE } from "@/lib/constants";
import { useListTestimonials } from "@workspace/api-client-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const defaultTestimonials = [
  { id: 1, name: "Grace Wanjiku", role: "Daughter of patient", message: "The nurse who cared for my mother was exceptional — professional, kind, and so thorough. Catecos gave us peace of mind during a very stressful time.", rating: 5 },
  { id: 2, name: "Joseph Kamau", role: "Patient, post-surgery", message: "After my knee surgery, I was worried about managing at home. The Catecos team made recovery smooth and comfortable. Truly world-class service.", rating: 5 },
  { id: 3, name: "Mary Achieng", role: "New mother", message: "The maternal care nurse was a blessing. She helped me breastfeed confidently and kept my baby healthy. I recommend Catecos to every new mother in Nairobi.", rating: 5 },
  { id: 4, name: "David Mwangi", role: "Son of elderly patient", message: "My father has dementia and needed specialised support. The Catecos carer was patient, warm, and clinically excellent. We felt safe having him in our home.", rating: 5 },
  { id: 5, name: "Esther Otieno", role: "Diabetic patient", message: "Managing my diabetes was overwhelming until Catecos stepped in. My nurse visits twice a week and has completely transformed how I manage my condition.", rating: 5 },
  { id: 6, name: "Samuel Njoroge", role: "Post-operative patient", message: "I had a hip replacement and was discharged within days. The Catecos nurse ensured my recovery was safe, fast, and pain-managed. Outstanding service.", rating: 5 },
];

export default function TestimonialsPage() {
  const { data: testimonials = [], isLoading } = useListTestimonials();
  const list = isLoading ? [] : testimonials.length > 0 ? testimonials : defaultTestimonials;

  useEffect(() => {
    document.title = "Testimonials | Catecos Nursing Hub";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">Client Reviews</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-serif font-bold mb-4">
              What Our Clients <span className="text-primary italic">Say About Us</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground leading-relaxed">
              Real stories from real families across Nairobi who have experienced the Catecos difference.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-12 bg-white border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col md:flex-row items-center justify-center gap-10">
            <motion.div variants={fadeIn} className="text-center">
              <p className="text-6xl font-bold text-primary mb-2">5.0</p>
              <div className="flex gap-1 justify-center mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-muted-foreground text-sm">Average Rating</p>
            </motion.div>
            <div className="w-px h-16 bg-border hidden md:block" />
            {[
              { value: "500+", label: "Happy Families" },
              { value: "100%", label: "Would Recommend" },
              { value: "30 min", label: "Avg. Response Time" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="text-center">
                <p className="text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-3xl p-8 h-56 animate-pulse border border-border/40" />
              ))}
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {list.map((t: any, i: number) => (
                <motion.div key={t.id ?? i} variants={fadeIn} className="bg-white rounded-3xl p-8 border border-border/40 hover:shadow-lg transition-shadow relative">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating ?? 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic mb-6">"{t.message}"</p>
                  <div className="border-t border-border/40 pt-4">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Hundreds of Happy Families
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/80 text-lg mb-8">
            Experience the care that has earned us 5 stars from families across Nairobi.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="rounded-full h-14 px-8 bg-white text-primary hover:bg-white/90 font-bold">Book a Nurse</Button>
            </Link>
            <a href={`tel:${PHONE}`}>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-white/40 text-white hover:bg-white/10 gap-2">
                <Phone className="h-5 w-5" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
