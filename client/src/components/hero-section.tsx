import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingElements = [
  { size: 16, top: "20%", left: "10%", delay: 0 },
  { size: 24, top: "15%", right: "20%", delay: 2 },
  { size: 32, bottom: "25%", left: "15%", delay: 4 },
  { size: 20, bottom: "20%", right: "10%", delay: 1 },
];

const typewriterText = "Senior Frontend & AI Engineer";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 opacity-90 animate-gradient bg-[length:400%_400%]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute bg-white/20 rounded-full"
            style={{
              width: element.size,
              height: element.size,
              top: element.top,
              bottom: element.bottom,
              left: element.left,
              right: element.right,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: element.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block">Alex Chen</span>
            <motion.span
              className="block text-3xl sm:text-4xl lg:text-5xl font-normal text-white/90 mt-2"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 3, ease: "easeInOut" }}
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            >
              {typewriterText}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Building innovative digital experiences with cutting-edge AI
            integration and modern web technologies
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
              onClick={() => scrollToSection("projects")}
              data-testid="button-view-work"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection("contact")}
              data-testid="button-connect"
            >
              Let's Connect
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Mail, href: "mailto:alex@example.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                data-testid={`social-${label.toLowerCase()}`}
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={() => scrollToSection("about")}
          className="text-white/60 hover:text-white transition-colors"
          data-testid="scroll-indicator"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </motion.div>
    </section>
  );
}
