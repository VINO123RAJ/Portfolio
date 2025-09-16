import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion, useScroll, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useSpring, animated, config } from "react-spring";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

// Advanced Morphing Hamburger Menu Component
const MorphingHamburger = ({ isOpen, onClick, className = "" }: { isOpen: boolean; onClick: () => void; className?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const hamburgerSpring = useSpring({
    transform: `rotate(${isOpen ? 45 : 0}deg)`,
    borderRadius: isOpen ? "50%" : "8px",
    background: isOpen 
      ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
      : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    config: config.wobbly,
  });

  const line1Spring = useSpring({
    transform: isOpen 
      ? "translateY(8px) rotate(45deg)" 
      : "translateY(0px) rotate(0deg)",
    opacity: isOpen ? 1 : 1,
    width: isOpen ? "24px" : "20px",
    config: config.wobbly,
  });

  const line2Spring = useSpring({
    opacity: isOpen ? 0 : 1,
    transform: `scaleX(${isOpen ? 0 : 1})`,
    config: config.wobbly,
  });

  const line3Spring = useSpring({
    transform: isOpen 
      ? "translateY(-8px) rotate(-45deg)" 
      : "translateY(0px) rotate(0deg)",
    opacity: isOpen ? 1 : 1,
    width: isOpen ? "24px" : "16px",
    config: config.wobbly,
  });

  return (
    <animated.button
      style={hamburgerSpring}
      onClick={onClick}
      className={`relative w-12 h-12 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow ${className}`}
      data-testid="morphing-hamburger"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-1">
        <animated.div
          style={line1Spring}
          className="h-0.5 bg-white rounded-full origin-center"
        />
        <animated.div
          style={line2Spring}
          className="h-0.5 w-5 bg-white rounded-full"
        />
        <animated.div
          style={line3Spring}
          className="h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </animated.button>
  );
};

// 3D Flip Navigation Link Component
const FlipNavLink = ({ item, isActive, onClick }: { item: { id: string; label: string }; isActive: boolean; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const flipSpring = useSpring({
    transform: `perspective(1000px) rotateY(${isHovered && !shouldReduceMotion ? 180 : 0}deg)`,
    config: config.gentle,
  });

  const magneticSpring = useSpring({
    transform: `translate3d(${isHovered ? Math.random() * 4 - 2 : 0}px, ${isHovered ? Math.random() * 4 - 2 : 0}px, 0)`,
    config: config.wobbly,
  });

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <animated.button
        style={magneticSpring}
        onClick={onClick}
        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden group ${
          isActive
            ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
            : "text-foreground/80 hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-600/80"
        }`}
        data-testid={`nav-${item.id}`}
      >
        <animated.div style={flipSpring} className="relative z-10">
          <span className="block" style={{ backfaceVisibility: "hidden" }}>
            {item.label}
          </span>
          <span 
            className="absolute inset-0 flex items-center justify-center text-cyan-300 font-bold"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            {item.label}
          </span>
        </animated.div>
        
        {/* Liquid hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </animated.button>
    </motion.div>
  );
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme, setTheme } = useTheme();
  const activeSection = useScrollSpy(navItems.map(item => item.id));
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  
  // Dynamic background blur based on scroll
  const backgroundBlur = useTransform(scrollY, [0, 200, 400], [0, 10, 20]);
  const backgroundOpacity = useTransform(scrollY, [0, 50, 100], [0, 0.7, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 50, 100], [0, 0.3, 0.6]);

  // Advanced scroll tracking with velocity and progress
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    
    const updateScrollMetrics = () => {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / maxScroll, 1);
      
      setScrollProgress(progress);
      scrollVelocity.set(velocity);
      lastScrollY = currentScrollY;
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollMetrics);
        ticking = true;
      }
    };
    
    // Mouse tracking for magnetic effects (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMobile, scrollVelocity]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };
  
  // Liquid navigation springs
  const navSpring = useSpring({
    background: `rgba(15, 23, 42, ${0.1 + scrollProgress * 0.8})`,
    backdropFilter: `blur(${Math.max(8, scrollProgress * 24)}px)`,
    borderColor: `rgba(148, 163, 184, ${0.1 + scrollProgress * 0.4})`,
    transform: `translateY(${Math.sin(scrollProgress * Math.PI) * -2}px)`,
    config: config.gentle,
  });
  
  const logoSpring = useSpring({
    scale: 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.05,
    rotate: scrollProgress * 5,
    config: config.wobbly,
  });
  
  // Mobile menu liquid animation
  const mobileMenuSpring = useSpring({
    height: isOpen ? "auto" : "0px",
    opacity: isOpen ? 1 : 0,
    transform: `translateY(${isOpen ? 0 : -20}px)`,
    background: `rgba(15, 23, 42, ${isOpen ? 0.95 : 0})`,
    config: config.gentle,
  });

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-[60] origin-left"
        style={{
          scaleX: scrollProgress,
          opacity: scrollProgress > 0.01 ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      
      <animated.nav
        ref={navRef}
        style={navSpring}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500"
      >
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo with liquid morphing */}
            <div className="flex-shrink-0">
              <animated.button
                style={logoSpring}
                onClick={() => scrollToSection("home")}
                className="relative text-xl font-bold cursor-pointer group"
                data-testid="nav-logo"
              >
                <motion.span
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Vinothraj P
                </motion.span>
                
                {/* Liquid glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl rounded-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </animated.button>
            </div>

            {/* Desktop Navigation with 3D flip effects */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <AnimatePresence>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <FlipNavLink
                        item={item}
                        isActive={activeSection === item.id}
                        onClick={() => scrollToSection(item.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20"
                  data-testid="theme-toggle"
                >
                  <motion.div className="relative">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
                    <Moon className="absolute top-0 left-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                  </motion.div>
                </Button>
              </motion.div>

              {/* Morphing Hamburger Menu */}
              <div className="md:hidden">
                <MorphingHamburger
                  isOpen={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </div>

          {/* Advanced Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <animated.div
                style={mobileMenuSpring}
                className="md:hidden overflow-hidden backdrop-blur-xl border-t border-white/10"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-2 pt-4 pb-6 space-y-2"
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                            : "text-foreground/80 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-600/80"
                        }`}
                        data-testid={`mobile-nav-${item.id}`}
                      >
                        <motion.span
                          whileHover={{ x: 4 }}
                          className="flex items-center justify-between"
                        >
                          {item.label}
                          <motion.div
                            className="w-2 h-2 rounded-full bg-current"
                            animate={activeSection === item.id ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                        </motion.span>
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </animated.div>
            )}
          </AnimatePresence>
        </motion.div>
      </animated.nav>
    </>
  );
}
