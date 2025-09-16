import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { useSpring as useReactSpring, animated, config } from "react-spring";
import { Briefcase, Code, GraduationCap, Brain, Zap, Target, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { timelineData, skillBadges, parallaxLayers, morphingPatterns } from "@/lib/data";

// Interface definitions
interface MousePosition {
  x: number;
  y: number;
}

interface TimelineItemColor {
  primary: string;
  secondary: string;
  gradient: string;
}

interface TimelineItem {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  detailedDescription: string;
  achievements: string[];
  skills: string[];
  technologies: string[];
  color: TimelineItemColor;
  icon: string;
  position3D: { x: number; y: number; z: number };
  floatingElements: string[];
  particleColor: string;
  magneticStrength: number;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  color: string;
  size: 'large' | 'medium' | 'small';
}

interface ParallaxElement {
  type: string;
  count?: number;
  size?: number;
  color?: string;
  opacity?: number;
  shapes?: string[];
}

interface ParallaxLayer {
  id: string;
  depth: number;
  elements: ParallaxElement[];
}

interface MorphingShape {
  type: string;
  count?: number;
  animation?: string;
}

interface MorphingPattern {
  id: string;
  scrollRange: number[];
  shapes: MorphingShape[];
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  mousePosition: MousePosition;
  isHovered: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
}

interface FloatingSkillBadgeProps {
  skill: Skill;
  index: number;
  timelineLength: number;
}

interface ParticleNetworkProps {
  timelineItems: TimelineItem[];
  hoveredCard: number | null;
  scrollProgress: MotionValue<number>;
}

interface MorphingPatternsProps {
  scrollProgress: MotionValue<number>;
}

interface ParallaxLayerProps {
  layer: ParallaxLayer;
  scrollYProgress: MotionValue<number>;
}

// Particle interface for canvas animation
interface Particle {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  size: number;
  pulse: number;
}

interface FlowParticle {
  progress: number;
  size: number;
  opacity: number;
}

interface Connection {
  from: number;
  to: number;
  flowParticles: FlowParticle[];
}

// Custom hook for device detection
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile, isTablet };
};

// Custom hook for mouse position tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

// Custom hook for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};

// Timeline Card Component with 3D transforms
const TimelineCard = ({ item, index, mousePosition, isHovered, onHover, onLeave }: TimelineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // 3D transform calculations
  const cardSpring = useReactSpring({
    transform: isHovered && !prefersReducedMotion
      ? `perspective(1000px) rotateX(${(mousePosition.y - 300) * 0.02}deg) rotateY(${(mousePosition.x - 300) * 0.02}deg) translateZ(50px)`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    boxShadow: isHovered
      ? `0 25px 50px -12px ${item.color.primary}40`
      : "0 10px 25px -12px rgba(0, 0, 0, 0.1)",
    config: config.gentle
  });

  // Icon mapping
  const iconMap: Record<string, typeof Briefcase> = {
    briefcase: Briefcase,
    code: Code,
    "graduation-cap": GraduationCap
  };
  const IconComponent = iconMap[item.icon] || Briefcase;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <animated.div style={cardSpring as any}>
        <Card
          className={`relative overflow-hidden backdrop-blur-sm bg-card/80 border-0 cursor-pointer group transform-gpu`}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={onLeave}
          data-testid={`timeline-card-${item.id}`}
        >
          {/* Gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${item.color.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />
          
          {/* Glowing border effect */}
          <div 
            className="absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ borderColor: item.color.primary }}
          />

          <CardContent className="p-6">
            {/* Icon with 3D effect */}
            <motion.div 
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color.gradient} flex items-center justify-center mb-4 shadow-lg`}
              whileHover={{ 
                scale: 1.1, 
                rotateY: 360,
                boxShadow: `0 0 30px ${item.color.primary}60`
              }}
              transition={{ duration: 0.6 }}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </motion.div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.period}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <p className="text-base font-semibold" style={{ color: item.color.primary }}>
                  {item.company}
                </p>
                <span className="text-sm text-muted-foreground">• {item.location}</span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Skills preview */}
              <div className="flex flex-wrap gap-2 mt-4">
                {item.skills.slice(0, 3).map((skill: string) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
                {item.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </animated.div>
    </motion.div>
  );
};

// Floating Skill Badge Component
const FloatingSkillBadge = ({ skill, index, timelineLength }: FloatingSkillBadgeProps) => {
  const prefersReducedMotion = useReducedMotion();
  const orbitRadius = 150 + (index % 3) * 50;
  const orbitSpeed = 0.5 + (index % 3) * 0.2;
  
  const floatingAnimation = useReactSpring({
    from: { 
      transform: `rotate(${index * (360 / timelineLength)}deg) translateX(${orbitRadius}px) rotate(-${index * (360 / timelineLength)}deg)`,
      opacity: 0 
    },
    to: async (next) => {
      await next({ opacity: 1 });
      if (!prefersReducedMotion) {
        while (true) {
          await next({ 
            transform: `rotate(${(index * (360 / timelineLength)) + 360}deg) translateX(${orbitRadius}px) rotate(-${(index * (360 / timelineLength)) + 360}deg)` 
          });
        }
      }
    },
    config: { duration: 20000 / orbitSpeed },
    loop: !prefersReducedMotion
  });

  const sizeMap: Record<string, string> = {
    large: "text-sm px-4 py-2",
    medium: "text-xs px-3 py-1.5", 
    small: "text-xs px-2 py-1"
  };

  return (
    <animated.div 
      style={floatingAnimation}
      className="absolute pointer-events-none"
      data-testid={`floating-badge-${skill.id}`}
    >
      <Badge 
        className={`${sizeMap[skill.size]} shadow-lg border-0 backdrop-blur-sm`}
        style={{ 
          backgroundColor: `${skill.color}20`,
          borderColor: skill.color,
          color: skill.color,
          boxShadow: `0 0 20px ${skill.color}30`
        }}
      >
        {skill.name}
      </Badge>
    </animated.div>
  );
};

// Animated Particle Network Component
const ParticleNetwork = ({ timelineItems, hoveredCard, scrollProgress }: ParticleNetworkProps) => {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: Particle[] = [];
    const connections: Connection[] = [];
    
    // Create particles for each timeline item
    timelineItems.forEach((item: TimelineItem, index: number) => {
      const angle = (index * (2 * Math.PI)) / timelineItems.length;
      const radius = 300;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius;
      
      particles.push({
        x, y, 
        originalX: x, 
        originalY: y,
        color: item.particleColor,
        size: hoveredCard === index ? 8 : 4,
        pulse: 0
      });
    });
    
    // Create flowing particles along connections
    const createFlowingParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(particles[i].x - particles[j].x, 2) + 
            Math.pow(particles[i].y - particles[j].y, 2)
          );
          
          if (distance < 400) {
            connections.push({
              from: i,
              to: j,
              flowParticles: Array.from({ length: 3 }, (_, k) => ({
                progress: k * 0.33,
                size: 2,
                opacity: 0.6
              }))
            });
          }
        }
      }
    };
    
    createFlowingParticles();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach((particle, index) => {
        particle.pulse += 0.1;
        particle.size = (hoveredCard === index ? 8 : 4) + Math.sin(particle.pulse) * 2;
        
        // Magnetic effect
        if (hoveredCard === index) {
          particle.x += (Math.random() - 0.5) * 2;
          particle.y += (Math.random() - 0.5) * 2;
        } else {
          particle.x += (particle.originalX - particle.x) * 0.1;
          particle.y += (particle.originalY - particle.y) * 0.1;
        }
      });
      
      // Draw connections with flowing particles
      connections.forEach(connection => {
        const fromParticle = particles[connection.from];
        const toParticle = particles[connection.to];
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(fromParticle.x, fromParticle.y);
        ctx.lineTo(toParticle.x, toParticle.y);
        ctx.strokeStyle = `${fromParticle.color}20`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw flowing particles
        connection.flowParticles.forEach((flowParticle: FlowParticle) => {
          flowParticle.progress += 0.01;
          if (flowParticle.progress > 1) flowParticle.progress = 0;
          
          const x = fromParticle.x + (toParticle.x - fromParticle.x) * flowParticle.progress;
          const y = fromParticle.y + (toParticle.y - fromParticle.y) * flowParticle.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, flowParticle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${fromParticle.color}${Math.floor(flowParticle.opacity * 255).toString(16)}`;
          ctx.fill();
        });
      });
      
      // Draw main particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}30`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [timelineItems, hoveredCard, prefersReducedMotion]);
  
  if (prefersReducedMotion) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      data-testid="particle-network"
    />
  );
};

// Morphing Background Patterns Component  
const MorphingPatterns = ({ scrollProgress }: MorphingPatternsProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const currentPattern = useTransform(scrollProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 0]);
  const patternOpacity = useTransform(scrollProgress, [0, 1], [0.1, 0.3]);
  
  if (prefersReducedMotion) return null;
  
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
      {morphingPatterns.map((pattern, index) => {
        const isActive = useTransform(currentPattern, (latest) => 
          Math.abs(latest - index) < 0.5 ? 1 : 0
        );
        
        return (
          <motion.div
            key={pattern.id}
            className="absolute inset-0"
            style={{ opacity: isActive }}
            data-testid={`morphing-pattern-${pattern.id}`}
          >
            {pattern.shapes.map((shape, shapeIndex) => (
              <div key={shapeIndex} className="absolute inset-0">
                {shape.type === 'circle' && (
                  <div className="w-full h-full">
                    {Array.from({ length: shape.count || 0 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full border"
                        style={{
                          left: `${(i % 6) * 16.67}%`,
                          top: `${Math.floor(i / 6) * 20}%`,
                          borderColor: '#3b82f6',
                        }}
                        animate={shape.animation === 'pulse' ? {
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.7, 0.3]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                )}
                {shape.type === 'rectangle' && (
                  <div className="w-full h-full">
                    {Array.from({ length: shape.count || 0 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-8 h-2 bg-gradient-to-r from-green-500/20 to-blue-500/20"
                        style={{
                          left: `${Math.random() * 90 + 5}%`,
                          top: `${Math.random() * 90 + 5}%`,
                        }}
                        animate={shape.animation === 'typewriter' ? {
                          scaleX: [0, 1, 1, 0],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                )}
                {shape.type === 'polygon' && (
                  <div className="w-full h-full">
                    {Array.from({ length: shape.count || 0 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-6 h-6 border-2 border-purple-500/30"
                        style={{
                          left: `${Math.random() * 90 + 5}%`,
                          top: `${Math.random() * 90 + 5}%`,
                          clipPath: `polygon(50% 0%, 0% 100%, 100% 100%)` // Triangle
                        }}
                        animate={shape.animation === 'rotate' ? {
                          rotate: [0, 360]
                        } : {}}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    ))}
                  </div>
                )}
                {shape.type === 'particle' && (
                  <div className="w-full h-full">
                    {Array.from({ length: shape.count || 0 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-500 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={shape.animation === 'flow' ? {
                          x: [0, 100, -100, 0],
                          y: [0, -50, 50, 0],
                          opacity: [0, 1, 1, 0]
                        } : {}}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Parallax Background Layer Component
const ParallaxLayer = ({ layer, scrollYProgress }: ParallaxLayerProps) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * layer.depth]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, layer.depth, 0.1]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ y, opacity }}
      data-testid={`parallax-layer-${layer.id}`}
    >
      {layer.elements.map((element: ParallaxElement, index: number) => (
        <div key={index} className="absolute inset-0">
          {element.type === "particles" && (
            <div className="w-full h-full">
              {Array.from({ length: element.count || 0 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: element.size,
                    height: element.size,
                    backgroundColor: element.color,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: element.opacity || 0.1
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [element.opacity || 0.1, (element.opacity || 0.1) * 0.5, element.opacity || 0.1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
          {element.type === "geometric" && (
            <div className="w-full h-full">
              {Array.from({ length: element.count || 0 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 90 + 5}%`,
                    top: `${Math.random() * 90 + 5}%`,
                    opacity: element.opacity || 0.1
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="w-8 h-8 border-2"
                    style={{ 
                      borderColor: element.color,
                      borderRadius: (element.shapes && element.shapes[i % element.shapes.length]) === "circle" ? "50%" : "0"
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

// Main 3D About Section Component
export default function AboutSection3D() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const mousePosition = useMousePosition();
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Magnetic interaction for timeline center
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 150, damping: 15 });
  const springY = useSpring(magneticY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (!prefersReducedMotion && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2)
      );
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        magneticX.set((mousePosition.x - centerX) * force * 0.1);
        magneticY.set((mousePosition.y - centerY) * force * 0.1);
      } else {
        magneticX.set(0);
        magneticY.set(0);
      }
    }
  }, [mousePosition, magneticX, magneticY, prefersReducedMotion]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
      style={{ position: 'relative' }}
      data-testid="about-section-3d"
    >
      {/* Morphing Background Patterns */}
      <MorphingPatterns scrollProgress={scrollYProgress} />
      
      {/* Parallax Background Layers */}
      {parallaxLayers.map((layer) => (
        <ParallaxLayer key={layer.id} layer={layer} scrollYProgress={scrollYProgress} />
      ))}

      {/* Particle Network */}
      <ParticleNetwork 
        timelineItems={timelineData} 
        hoveredCard={hoveredCard} 
        scrollProgress={scrollYProgress}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="py-20 md:py-28 px-4 relative overflow-hidden" // Added relative and overflow-hidden
>
  {/* --- Background Animated Elements --- */}
  <motion.div
    className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    animate={{
      x: [-20, 20, -20],
      y: [-20, 20, -20],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      repeatType: "mirror", // Makes the animation smooth back and forth
      ease: "easeInOut",
    }}
  />
  <motion.div
    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    animate={{
      x: [20, -20, 20],
      y: [20, -20, 20],
      scale: [1, 0.9, 1],
    }}
    transition={{
      duration: 30, // Different duration for a more organic feel
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  />

  {/* --- ABOUT ME HEADING (UNCHANGED) --- */}
  <motion.h2
    className="text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent mb-16 text-center tracking-tight"
    style={{
      background: "linear-gradient(135deg, #00C6FF, #92FE9D, #00C6FF)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
    }}
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  >
    About Me
  </motion.h2>

  <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl mx-auto relative z-10">

    {/* --- Image Column --- */}
    <motion.div
      className="lg:w-1/3 w-full max-w-sm relative group"
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.3 }}
    >
      <div className="absolute inset-0 rounded-xl p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-rose-500 rounded-xl blur-lg animate-pulse"></div>
      </div>

      <motion.img
        src="/Vinoth.jpg"
        alt="Vinothraj P"
        className="relative z-10 rounded-xl w-full h-auto object-cover shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-1"
        initial={{ scale: 0.95, rotate: -2 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>

    {/* --- Text Column --- */}
    <motion.div
      className="lg:w-2/3 w-full lg:text-left text-center"
      initial={{ opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.5 }}
    >
      <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-4">
        <p>As a detail-oriented Computer Science student, I am driven by the challenge of transforming complex problems into elegant and intuitive solutions. My philosophy is rooted in using cutting-edge technology and a human-centered design approach to build applications that are both powerful and user-friendly.</p>
        <p>My practical experience as a Frontend Developer Intern allowed me to build and maintain responsive web applications using React, where I focused on effective UI design and API integration. My passion for innovation truly comes alive in my personal projects, particularly my AI Voice Assistant. This project allowed me to dive deep into AI integration, using Python to implement speech recognition, task automation, and other intelligent features.</p>
        <p>I am eager to bring my skills in web development and my passion for AI to a dynamic team, where I can continue to learn, grow, and contribute to building the next generation of impactful software.</p>
      </div>
    </motion.div>

  </div>
</motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-8"
            style={{ 
              background: "linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text"
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            Internships
          </motion.h2>
        </motion.div>


        {/* 3D Timeline Container */}
        <div className="relative">
          {/* Central Timeline Hub */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ x: springX, y: springY }}
            data-testid="timeline-hub"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl flex items-center justify-center backdrop-blur-sm opacity-30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-8 h-8 text-white opacity-50" />
              </motion.div>
            </div>
            
            {/* Floating skill badges around the hub */}
            <div className="absolute inset-0">
              {(skillBadges as Skill[]).slice(0, 8).map((skill: Skill, index: number) => (
                <FloatingSkillBadge 
                  key={skill.id} 
                  skill={skill} 
                  index={index}
                  timelineLength={8}
                />
              ))}
            </div>
          </motion.div>

          {/* Timeline Cards Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {timelineData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                mousePosition={mousePosition}
                isHovered={hoveredCard === index}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Users, label: "Key Projects Built", value: "2", color: "#3b82f6" },
            { icon: Target, label: "Productivity Gain", value: "80%", color: "#10b981" },
            { icon: Zap, label: "Certifications Earned", value: "4", color: "#8b5cf6" },
            { icon: Award, label: "Leadership Roles", value: "2", color: "#f59e0b" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
                whileHover={{ 
                  backgroundColor: `${stat.color}30`,
                  boxShadow: `0 0 30px ${stat.color}40`
                }}
              >
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                style={{ color: stat.color }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </section>
    
  );
}