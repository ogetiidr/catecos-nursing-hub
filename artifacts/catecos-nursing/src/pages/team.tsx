import { useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TEAM, PHONE } from "@/lib/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function TeamPage() {
  useEffect(() => {
    document.title = "Our Team | Catecos Nursing Hub";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">Our Team</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Meet the Nurses<br /><span className="text-primary italic">Behind the Care</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every member of our team is a credentialed healthcare professional — selected not only for their clinical expertise, but for their compassion, reliability, and commitment to excellence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div key={i} variants={fadeIn} className="group text-center">
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] mb-6 shadow-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
                      <Award className="h-3 w-3" /> {member.credentials}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Our Standards</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Every Nurse We Send Meets Our Standards</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Registered & Licensed", body: "All nurses are registered with the Nursing Council of Kenya and hold valid practicing licenses." },
              { title: "Background Checked", body: "Every nurse undergoes thorough criminal and reference checks before joining our team." },
              { title: "Continuously Trained", body: "We invest in regular CPD (Continuous Professional Development) for all our nursing staff." },
              { title: "Patient-Centered", body: "Our nurses are selected for their empathy and dedication to dignified, respectful patient care." },
              { title: "Reliable & Punctual", body: "We track attendance and performance to ensure consistent, dependable care for every patient." },
              { title: "Supervised & Supported", body: "Our clinical lead oversees all cases and is available to support nurses in complex care situations." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white rounded-2xl p-6 border border-border/40 hover:border-primary/20 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Meet Your Nurse?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/80 text-lg mb-8">
            Book a nurse today and we'll match you with the right professional for your specific care needs.
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
