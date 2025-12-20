"use client";

import { Button } from "@/components/ui/button";
import {
  Home,
  Code2,
  Rocket,
  Users2,
  Activity,
  Book,
  Layout,
} from "lucide-react";
import { CreateProjectDialog } from "./CreateProject";
import { SideBarProps, TProjectCard } from "./types";

export const SideBar = ({
  SetProjects,
  Projects,
  TriggerRefresh,
}: SideBarProps) => {
  const handleCreateProject = async (data: {
    name: string;
    track: "WebDevelopment" | "SoftWareDevelopment";
  }) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Project creation failed");
      }
      const project: TProjectCard = await res.json();
      SetProjects((prev) => [project, ...prev]);
      TriggerRefresh?.();
    } catch (err) {
      console.error("Create project error:", err);
    }
  };

  return (
    <aside className="relative w-64 h-[calc(100vh-4rem)] p-4 bg-black/30 border-r border-[#1a1a1a] backdrop-blur-lg shadow-inner shadow-[#0050FF]/5 overflow-hidden group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <CreateProjectDialog onCreateProject={handleCreateProject} />

          <nav className="mt-4 space-y-1">
            {[
              { icon: Home, label: "Home" },
              { icon: Code2, label: "Projects" },
              { icon: Rocket, label: "Deployments" },
              { icon: Users2, label: "Teams" },
              { icon: Activity, label: "Usage" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#151B28]/80 rounded-xl"
              >
                <item.icon className="mr-2 h-4 w-4 text-[#0050FF]" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="pt-6 mt-6 border-t border-[#1f1f1f]">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 px-2">
              Explore
            </h3>
            {[
              { icon: Layout, label: "Templates" },
              { icon: Book, label: "Documentation" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#151B28]/80 rounded-xl"
              >
                <item.icon className="mr-2 h-4 w-4 text-[#0050FF]" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center mt-6">
          Code with{" "}
          <span className="text-[#0050FF] font-semibold">Pulse ⚡</span>
        </div>
      </div>
    </aside>
  );
};
