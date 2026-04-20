import { motion } from "framer-motion";
import { WHATSAPP } from "@/lib/constants";

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP}?text=Hello%20Catecos%20Nursing%20Hub%2C%20I%20would%20like%20to%20inquire%20about%20your%20nursing%20services.`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20b858] transition-colors"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.802 1.787 6.82L2 30l7.368-1.763A13.948 13.948 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.6a11.58 11.58 0 0 1-5.908-1.611l-.424-.252-4.375 1.045 1.086-4.26-.276-.44A11.559 11.559 0 0 1 4.4 16.003c0-6.4 5.203-11.603 11.603-11.603 6.4 0 11.603 5.203 11.603 11.603S22.403 27.6 16.003 27.6zm6.367-8.688c-.35-.175-2.063-1.018-2.383-1.133-.32-.116-.553-.175-.786.175-.232.35-.9 1.133-1.104 1.366-.204.232-.407.261-.757.087-.35-.175-1.477-.544-2.812-1.735-1.04-.926-1.74-2.07-1.944-2.42-.204-.35-.022-.539.153-.713.157-.157.35-.407.525-.611.175-.204.233-.35.35-.583.116-.232.058-.436-.029-.611-.087-.175-.786-1.895-1.077-2.595-.283-.682-.571-.589-.786-.6l-.668-.011c-.233 0-.611.087-.931.436-.32.35-1.222 1.194-1.222 2.914s1.251 3.38 1.426 3.613c.175.232 2.463 3.76 5.97 5.27.834.36 1.485.575 1.993.736.837.267 1.6.229 2.203.139.672-.1 2.063-.843 2.355-1.658.291-.815.291-1.514.204-1.659-.087-.146-.32-.233-.67-.407z" />
      </svg>
      <span className="sr-only">Chat on WhatsApp</span>
    </motion.a>
  );
}
