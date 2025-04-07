"use client";
import { JSX, useEffect, useState } from "react";
import { TProjectCard } from "./types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  searchQuery: string;
  Projects: TProjectCard[];
}

export const ProjectCard = ({
  searchQuery,
  Projects,
}: ProjectCardProps): JSX.Element => {
  const [filteredProjects, setFilterProjects] =
    useState<TProjectCard[]>(Projects);

  useEffect(() => {
    setFilterProjects(
      Projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, Projects]);

  return (
    <>
      {filteredProjects.length === 0 ? (
        <Card className="bg-[#0D1119]/60 border border-[#1a1f2e] backdrop-blur-md p-6 text-center flex flex-col items-center justify-center space-y-4 shadow-lg shadow-[#0050FF]/10">
          <h3 className="text-2xl font-semibold text-gray-200">
            No Recent Projects
          </h3>
          <p className="text-gray-400 text-sm max-w-xs">
            You haven't created any projects yet. Click below to start a new one!
          </p>
          <Button className="bg-[#0050FF] hover:bg-[#336CFF] text-white px-4 py-2 transition-all duration-200 rounded-xl shadow-md hover:shadow-blue-500/20">
            <Plus className="mr-2 h-4 w-4" /> Create Project
          </Button>
        </Card>
      ) : (
        filteredProjects.map((project) => (
          <Card
            key={project.name}
            className="relative bg-gradient-to-br from-black via-[#0A0A0A] to-black hover:border-2 border border-transparent overflow-hidden group transition-all duration-300 hover:border-[#0050FF]/30 rounded-2xl border-zinc-500"
            style={{
              boxShadow:
                "0 4px 20px rgba(0, 80, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Metallic Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#0050FF]/15 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000" />

            <div className="relative p-6 backdrop-blur-[2px] backdrop-saturate-150">
              <h3 className="text-2xl font-bold mb-3 tracking-tight bg-gradient-to-br from-white to-[#0050FF]/60 bg-clip-text text-transparent">
                {project.name}
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 flex-wrap">
                  <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/10 rounded-md">
                    {project.type}
                  </Badge>
                  <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/10 rounded-md">
                    {project.language}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-blue-400/60 text-sm">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Link
                    href={
                      project.type === "SoftwareDev"
                        ? `/CodeEditor/${project.name}`
                        : `/WebDev/${project.name}`
                    }
                  >
                    <Button
                      variant="secondary"
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all duration-300 rounded-md hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(0,80,255,0.15)]"
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
