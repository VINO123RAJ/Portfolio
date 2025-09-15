import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { projects } from "@/lib/data";

interface ProjectModalProps {
  project: typeof projects[0] | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>

          <div>
            <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Challenges & Solutions</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.challenges}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Results & Impact</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.outcome}
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              className="bg-primary hover:bg-primary/90"
              data-testid={`modal-github-${project.id}`}
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Button>
            <Button
              variant="outline"
              data-testid={`modal-live-demo-${project.id}`}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
