import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Tag, ArrowRight, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BLOG_POSTS, PHONE } from "@/lib/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

type Post = typeof BLOG_POSTS[0];

export default function BlogPage() {
  const [selected, setSelected] = useState<Post | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    document.title = "Health Tips & Blog | Catecos Nursing Hub";
  }, []);

  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];
  const filtered = filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeIn} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">Health Tips & Blog</motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Expert Health Tips <span className="text-primary italic">& Insights</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground leading-relaxed">
              Evidence-based health information from our team of registered nurses — helping you and your family stay informed, healthy, and well-cared-for.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <motion.div
                key={post.id}
                variants={fadeIn}
                onClick={() => setSelected(post)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-border/40 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-primary">
                    <Tag className="h-3 w-3" /> {post.category}
                  </span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Need Professional Nursing Care?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/80 text-lg mb-8">
            Reading is great — but professional care is better. Book a nurse today.
          </motion.p>
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

      {/* Article Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white px-8 py-4 border-b border-border/40 flex items-center justify-between rounded-t-3xl z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Tag className="h-3 w-3" /> {selected.category}
                </span>
                <button onClick={() => setSelected(null)} className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span>{selected.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {selected.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 leading-snug">{selected.title}</h2>
                <img src={selected.image} alt={selected.title} className="w-full rounded-2xl object-cover h-52 mb-6" />
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {selected.content.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="mt-8 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="font-bold mb-1">Need professional nursing care?</p>
                  <p className="text-sm text-muted-foreground mb-4">Our registered nurses are available 24/7. Book today or call for immediate assistance.</p>
                  <div className="flex gap-3">
                    <Link href="/book" onClick={() => setSelected(null)}>
                      <Button className="rounded-full gap-2">Book a Nurse</Button>
                    </Link>
                    <a href={`tel:${PHONE}`}>
                      <Button variant="outline" className="rounded-full gap-2"><Phone className="h-4 w-4" /> Call</Button>
                    </a>
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
