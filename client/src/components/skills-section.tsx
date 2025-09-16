import { motion } from "framer-motion";
import { Code, Brain, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "Building modern, responsive, and interactive user interfaces using React, Next.js, and Tailwind CSS.",
    skills: [
      // { name: "React/Next.js", level: 95 },
      // { name: "TypeScript", level: 90 },
      // { name: "Tailwind CSS", level: 92 },
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Brain,
    title: "AI",
    description: "Enhancing applications with AI-powered features using OpenAI and TensorFlow",
    skills: [
      // { name: "TensorFlow.js", level: 85 },
      // { name: "OpenAI API", level: 88 },
      // { name: "Python/PyTorch", level: 80 },
    ],
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Creating scalable backend systems with Node.js, cloud services, and API integrations.",
    skills: [
      // { name: "Node.js/Express", level: 87 },
      // { name: "AWS/Vercel", level: 83 },
      // { name: "Docker/K8s", level: 78 },
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const technologies = [
  { name: "React", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { name: "Next.js", color: "bg-gray-500/10 text-gray-700 dark:text-gray-300" },
  { name: "JavaScript", color: "bg-blue-600/10 text-blue-700 dark:text-blue-300" },
  { name: "Tailwind CSS", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
  { name: "Bootstrap", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { name: "Node.js", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { name: "PowerBI", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { name: "Python", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { name: "Mysql", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  { name: "c", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "API", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { name: "Integration", color: "bg-gray-500/10 text-gray-600 dark:text-gray-400" },
  { name: "Cloud", color: "bg-orange-600/10 text-orange-700 dark:text-orange-300" },
  { name: "MongoDB", color: "bg-green-600/10 text-green-700 dark:text-green-300" },
  { name: "AI", color: "bg-red-700/10 text-red-800 dark:text-red-200" },
  // { name: "Prisma", color: "bg-purple-600/10 text-purple-700 dark:text-purple-300" },
  // { name: "Supabase", color: "bg-cyan-600/10 text-cyan-700 dark:text-cyan-300" },
  // { name: "Vue.js", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-background">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                      <category.icon className={`${category.color} h-6 w-6`} />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  {/* <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-center mb-8">
                Technology Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Badge
                      className={`px-4 py-2 text-sm font-medium cursor-pointer ${tech.color} hover:shadow-lg transition-all duration-300`}
                      data-testid={`skill-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {tech.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
