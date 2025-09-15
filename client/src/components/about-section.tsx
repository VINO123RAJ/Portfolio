import { motion } from "framer-motion";
import { Briefcase, Code, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    icon: Briefcase,
    title: "Senior Frontend Engineer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    description: "Leading frontend architecture and AI integration initiatives",
    color: "text-blue-500",
  },
  {
    icon: Code,
    title: "Frontend Developer",
    company: "StartupXYZ",
    period: "2019 - 2021",
    description: "Built scalable React applications from ground up",
    color: "text-green-500",
  },
  {
    icon: GraduationCap,
    title: "Computer Science, M.S.",
    company: "Stanford University",
    period: "2017 - 2019",
    description: "Focus on AI and Human-Computer Interaction",
    color: "text-purple-500",
  },
];

const highlights = [
  "React Expert",
  "AI Integration",
  "Team Leadership",
  "System Architecture",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating exceptional digital experiences that
            combine cutting-edge technology with human-centered design
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-foreground leading-relaxed">
              With over 8 years of experience in frontend development and AI
              integration, I specialize in building scalable, performant
              applications that push the boundaries of what's possible on the
              web. My journey spans from startup environments to enterprise-level
              solutions.
            </p>

            <p className="text-lg text-foreground leading-relaxed">
              Currently leading frontend architecture at TechCorp, where I've
              architected systems serving millions of users while mentoring
              teams and driving innovation through AI-powered features.
            </p>

            <div className="flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <Badge
                  key={highlight}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative flex items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center relative z-10">
                    <item.icon className={`w-4 h-4 text-primary-foreground`} />
                  </div>
                  <div className="ml-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">
                      {item.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
