import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Phone, Youtube, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { PHONE, YOUTUBE } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <HeartPulse className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-primary leading-tight block">Catecos Nursing Hub</span>
            <span className="text-xs text-muted-foreground">& Home Care Services</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${location === link.href ? "text-primary font-semibold" : "hover:text-primary"}`}
            >
              {link.label}
            </Link>
          ))}
          <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
            <Youtube className="h-4 w-4" /> YouTube
          </a>
          <Link href="/book">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white gap-2 shadow-md">
              Book a Nurse
            </Button>
          </Link>
          <a href={`tel:${PHONE}`}>
            <Button variant="outline" className="rounded-full gap-2 border-primary/30">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-border px-6 pb-5 overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${location === link.href ? "text-primary font-semibold" : "hover:text-primary"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-red-600">
                <Youtube className="h-4 w-4" /> YouTube
              </a>
              <Link href="/book" onClick={() => setOpen(false)}>
                <Button className="rounded-full bg-primary gap-2 w-full">Book a Nurse</Button>
              </Link>
              <a href={`tel:${PHONE}`}>
                <Button variant="outline" className="rounded-full gap-2 w-full border-primary/30" onClick={() => setOpen(false)}>
                  <Phone className="h-4 w-4" /> {PHONE}
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
