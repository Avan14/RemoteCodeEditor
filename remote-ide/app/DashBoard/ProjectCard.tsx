import { useState } from "react";
import { projectcard_example, TProjectCard } from "./types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Plus } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  searchQuery: string;
}

export const ProjectCard = ({ searchQuery }: ProjectCardProps) => {
  const [Projects] = useState(projectcard_example);

  // Filter projects based on search query
  const filteredProjects = Projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filteredProjects.length === 0 ? (
        <Card className="bg-[#1C2333] border-gray-800 p-6 text-center flex flex-col items-center justify-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-300">
            No Recent Projects
          </h3>
          <p className="text-gray-400 text-sm max-w-xs">
            You haven't created any projects yet. Click below to start a new
            one!
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 px-4 py-2">
            <Plus className="mr-2 h-4 w-4" /> Create Project
          </Button>
        </Card>
      ) : (
        filteredProjects.map((project) => (
          <Card
            key={project.name}
            className="bg-[#1C2333] border-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                {project.name}
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                  >
                    {project.type}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                  >
                    {project.language}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-400 text-sm">
                    {project.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link
                    href={
                      project.name === "SoftwareDev"
                        ? `/codeEditor/${project.id}`
                        : `WebDev/${project.id}`
                    }
                  >
                    <Button
                      variant="secondary"
                      className="hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    >
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </>
  );
};
