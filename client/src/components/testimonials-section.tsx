import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Users, Code, Brain, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Data for your philosophy cards (unchanged)
const philosophyData = [
  {
    icon: Users,
    title: "Human-Centered Design",
    description: "I believe technology should serve people. I focus on building intuitive, user-friendly interfaces that provide a seamless and enjoyable experience.",
    color: "text-blue-500",
  },
  {
    icon: Code,
    title: "Clean & Efficient Code",
    description: "I am passionate about writing clean, maintainable, and efficient code. I believe a well-structured codebase is the foundation of any great application.",
    color: "text-green-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Innovation",
    description: "My goal is to integrate AI to build smarter, more efficient solutions. As shown in my projects, I love exploring how AI can automate tasks and enhance user interaction.",
    color: "text-purple-500",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "The tech world is always evolving, and I am committed to a journey of continuous learning. I am always excited to tackle new challenges and master new technologies.",
    color: "text-orange-500",
  },
];

// NEW: Refactored Card component to handle its own complex animations
const PhilosophyCard = ({ item, index }: { item: typeof philosophyData[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  // Variants for staggering child animations
  const cardContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full relative"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full text-center group transition-colors duration-300 overflow-hidden">
        {/* NEW: Spotlight Effect */}
        <motion.div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${item.color.replace('text-', 'bg-')}/15, transparent 80%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        <CardContent className="p-8 relative z-10">
          <motion.div
            variants={cardContentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <item.icon className={`${item.color} h-8 w-8`} />
              </div>
            </motion.div>
            <motion.h3 variants={itemVariants} className="text-xl font-semibold text-foreground mb-3">
              {item.title}
            </motion.h3>
            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
              {item.description}
            </motion.p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            My Development Philosophy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The core principles that guide my work and drive my passion for technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophyData.map((item, index) => (
            <PhilosophyCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}