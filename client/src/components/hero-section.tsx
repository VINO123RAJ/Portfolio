import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useSpring as useReactSpring, animated, config } from "react-spring";

// Advanced particle system with responsive count
const createParticleSystem = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
    speed: Math.random() * 0.5 + 0.2,
    opacity: Math.random() * 0.6 + 0.2,
    color: `hsl(${210 + Math.random() * 60}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 30}%)`,
  }));
};

// Check for mobile and reduced motion preferences
const useResponsiveParticles = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile ? 15 : 50; // Reduce particles on mobile
};

// Morphing geometric shapes
const MorphingShape = ({ index, mouseX, mouseY }: { index: number; mouseX: any; mouseY: any }) => {
  const x = useTransform(mouseX, [0, window.innerWidth || 1000], [0, 50]);
  const y = useTransform(mouseY, [0, window.innerHeight || 1000], [0, 50]);
  
  return (
    <motion.div
      className="absolute"
      style={{
        x: x,
        y: y,
        left: `${20 + index * 15}%`,
        top: `${30 + index * 10}%`,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        borderRadius: ["30%", "50%", "30%"],
      }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 backdrop-blur-sm border border-white/10"
        style={{
          clipPath: index % 2 === 0 
            ? "polygon(50% 0%, 0% 100%, 100% 100%)" 
            : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
        }}
      />
    </motion.div>
  );
};

// 3D Morphing Text Component
const MorphingText = ({ text, className }: { text: string; className: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text, currentIndex]);

  return (
    <motion.div
      className={className}
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ 
        transformPerspective: 1000,
        textShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
      }}
    >
      {displayText.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ rotateY: -90, opacity: 0, scale: 0 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          transition={{ 
            delay: i * 0.05,
            duration: 0.8,
            type: "spring",
            stiffness: 100 
          }}
          whileHover={{
            scale: 1.2,
            rotateY: 180,
            color: "#8b5cf6",
            transition: { duration: 0.3 }
          }}
          style={{ display: "inline-block", transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Liquid button component
const LiquidButton = ({ children, onClick, variant = "primary", className = "", ...props }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const liquidSpring = useReactSpring({
    scale: isHovered ? 1.05 : 1,
    borderRadius: isHovered ? "25px" : "12px",
    background: isHovered 
      ? "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)",
    boxShadow: isHovered 
      ? "0 20px 40px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
      : "0 10px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
    config: config.wobbly,
  });

  return (
    <animated.button
      style={liquidSpring}
      className={`px-8 py-4 text-white font-semibold border-0 cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      <motion.div
        animate={isHovered ? { x: [0, -2, 2, 0] } : {}}
        transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
      >
        {children}
      </motion.div>
    </animated.button>
  );
};

const typewriterText = "Frontend & UI Developer";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLElement>(null);
  
  // Performance and accessibility optimizations
  const shouldReduceMotion = useReducedMotion();
  const particleCount = useResponsiveParticles();
  const particles = createParticleSystem(particleCount);
  const isMobile = particleCount <= 15;

  // Magnetic cursor effect (disabled on touch devices)
  useEffect(() => {
    if (isMobile || 'ontouchstart' in window) return; // Skip on touch devices
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Advanced parallax transforms
  const backgroundY = useTransform(mouseY, [0, window.innerHeight || 1000], [0, -50]);
  const backgroundX = useTransform(mouseX, [0, window.innerWidth || 1000], [0, -30]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #1e3a8a 0%, #312e81 50%, #1f2937 100%)",
      }}
    >
      {/* Magnetic cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: cursorVariant === "text" ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Liquid background with advanced gradients */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-indigo-900/80" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/30 to-purple-600/40"
          animate={{
            background: [
              "radial-gradient(600px at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(800px at 60% 40%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
              "radial-gradient(600px at 40% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Advanced particle system */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              x: [0, Math.sin(particle.id) * 100, 0],
              y: [0, Math.cos(particle.id) * 100, 0],
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 10 + particle.speed * 10,
              repeat: Infinity,
              delay: particle.id * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Morphing geometric shapes */}
      <div className="absolute inset-0">
        {[0, 1, 2].map((index) => (
          <MorphingShape key={index} index={index} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* 3D Morphing main title */}
          <motion.div
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            <MorphingText 
              text="Vinothraj P"
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 cursor-pointer"
            />
          </motion.div>

          {/* Animated subtitle with liquid effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="text-2xl sm:text-3xl lg:text-4xl text-cyan-300 font-light mb-8"
              animate={{
                textShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                  "0 0 40px rgba(147, 51, 234, 0.6)",
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {typewriterText}
            </motion.div>
          </motion.div>

          {/* Dynamic description with morphing effects */}
          <motion.p
            className="text-xl sm:text-2xl text-blue-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            A Computer Science student with {" "}
            <motion.span
              className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              frontend development experience
            </motion.span>{" "}
            and a passion for building AI-powered automation solutions.
          </motion.p>

          {/* Liquid morphing buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <LiquidButton
              onClick={() => scrollToSection("projects")}
              data-testid="button-view-work"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                ✨ View My Work
              </motion.span>
            </LiquidButton>
            
            <LiquidButton
              onClick={() => scrollToSection("contact")}
              data-testid="button-connect"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                🚀 Let's Connect
              </motion.span>
            </LiquidButton>
          </motion.div>

          {/* Enhanced social links with magnetic effect */}
          <motion.div
            className="flex justify-center space-x-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            {[
              { icon: Github, href: "https://github.com/VINO123RAJ/", label: "GitHub", color: "#ff6b6b" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/p-vinoth-raj-141104raj/", label: "LinkedIn", color: "#4ecdc4" },
              // { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#45b7d1" },
              { icon: Mail, href: "mailto:vinoloke1973@gmail.com", label: "Email", color: "#f9ca24" },
            ].map(({ icon: Icon, href, label, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 3 + index * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                data-testid={`social-${label.toLowerCase()}`}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/20"
                  style={{ backgroundColor: `${color}40` }}
                  whileHover={{
                    backgroundColor: color,
                    boxShadow: `0 0 30px ${color}60`,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator with morphing animation */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          className="group relative"
          data-testid="scroll-indicator"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="w-12 h-20 border-2 border-white/40 rounded-full flex justify-center relative"
            animate={{
              borderColor: ["rgba(255,255,255,0.4)", "rgba(34,211,238,0.8)", "rgba(255,255,255,0.4)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{
                y: [0, 8, 0],
                backgroundColor: ["rgba(255,255,255,0.6)", "rgba(34,211,238,1)", "rgba(255,255,255,0.6)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
