import { HeartPulse, Phone, Mail, MapPin, Youtube, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PHONE, EMAIL, YOUTUBE, LOCATION, SERVICES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg">Catecos Nursing Hub</span>
                <span className="block text-xs text-white/50">& Home Care Services</span>
              </div>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed mb-5">
              Compassionate, professional, and reliable nursing care delivered to your home in Utawala, Nairobi. Available 24 hours, 7 days a week.
            </p>
            <a href={`tel:${PHONE}`}>
              <Button className="rounded-full bg-primary hover:bg-primary/90 gap-2">
                <Phone className="h-4 w-4" /> {PHONE}
              </Button>
            </a>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Book a Nurse", href: "/book" },
                { label: "Our Team", href: "/team" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">Contact</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-primary shrink-0" /> {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-primary shrink-0" /> {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {LOCATION}
              </li>
              <li>
                <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Youtube className="h-4 w-4 text-red-500 shrink-0" /> @CateCos-u1f
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                  <Clock className="h-3 w-3" /> Available 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Catecos Nursing Hub and Home Care Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-white/30 hover:text-white/60 text-xs transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
