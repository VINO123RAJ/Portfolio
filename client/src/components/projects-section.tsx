import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/data";

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  onViewDetails: (project: typeof projects[0]) => void;
}

function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="group cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              {project.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button
  onClick={() => window.open(project.github, "_blank")}
  className="text-muted-foreground hover:text-primary transition-colors"
  data-testid={`github-${project.id}`}
>
  <Github className="w-4 h-4" />
</button>

              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid={`live-demo-${project.id}`}
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(project)}
              className="text-primary hover:text-primary/80 transition-colors"
              data-testid={`view-details-${project.id}`}
            >
              Learn More →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  onProjectSelect: (project: typeof projects[0]) => void;
}

export default function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work combining innovative design with
            cutting-edge technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={onProjectSelect}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            data-testid="button-view-all-projects"
          >
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
