import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
          alt={`${title} image`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Previous">
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button onClick={() => setCurrent((c) => (c + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Next">
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const [selected, setSelected] = useState<(typeof SERVICES)[0] | null>(null);

  useEffect(() => {
    document.title = "Our Services | Catecos Nursing Hub";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">Our Services</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Comprehensive Home<br /><span className="text-primary italic">Healthcare Services</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From post-operative recovery to elderly care, we offer a full spectrum of professional nursing services — all delivered to your home in Nairobi, available 24/7.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                onClick={() => setSelected(service)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-border/40 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-4 left-4 h-10 w-10 rounded-xl bg-gradient-to-br ${service.color} backdrop-blur-sm flex items-center justify-center border border-white/30`}>
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.shortDesc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {service.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="rounded-full w-full border-primary/30 hover:bg-primary hover:text-white transition-all">
                    View Full Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Get Started?</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/80 text-lg mb-8">Book a nurse today or call us for immediate assistance. We respond within 30 minutes.</motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="rounded-full h-14 px-8 bg-white text-primary hover:bg-white/90 font-bold">Book a Nurse</Button>
            </Link>
            <a href={`tel:${PHONE}`}>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-white/40 text-white hover:bg-white/10 gap-2">
                <Phone className="h-5 w-5" /> Call {PHONE}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white px-8 py-4 border-b border-border/40 flex items-center justify-between rounded-t-3xl z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selected.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{selected.title}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8">
                <ImageCarousel images={selected.images} title={selected.title} />
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">About This Service</h3>
                    {selected.description.split("\n\n").map((para, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-3">{para}</p>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3">What's Included</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selected.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg">Need {selected.title}?</p>
                      <p className="text-muted-foreground text-sm">Call us now or book online — we respond within 30 minutes.</p>
                    </div>
                    <div className="flex gap-3">
                      <a href={`tel:${PHONE}`}>
                        <Button className="rounded-full gap-2"><Phone className="h-4 w-4" /> Call Now</Button>
                      </a>
                      <Link href="/book" onClick={() => setSelected(null)}>
                        <Button variant="outline" className="rounded-full">Book Online</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
