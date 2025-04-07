"use client";

import { Button } from "@/components/ui/button";
import {
  Plus,
  Home,
  Code2,
  Rocket,
  Users2,
  Activity,
  Book,
  Layout,
} from "lucide-react";
import { CreateProjectDialog } from "./CreateProject";
import { TProjectCard } from "./types";
import { useUserdata } from "../context/UserDataContext";
import axios from "axios";

export const SideBar = ({ SetProjects, Projects }: any) => {
  const { user: contextUser, setUser } = useUserdata();

  const handleCreateProject = async (project: TProjectCard) => {
    try {
      const newProjects = [...Projects, project];
      SetProjects(newProjects);

      const response = await axios.put("/Api/User", {
        userId: contextUser?.id,
        updatedprojects: newProjects,
      });

      if (response.data?.user) {
        setUser(response.data.user);
        console.log(response.data.user);
      }
    } catch (error) {
      console.error("Error updating user projects:", error);
      alert("Failed to update projects. Please try again.");
    }
  };

  return (
    <aside className="relative w-64 h-[calc(100vh-4rem)] p-4 bg-black/30 border-r border-[#1a1a1a] backdrop-blur-lg shadow-inner shadow-[#0050FF]/5 overflow-hidden group">
      {/* Shine hover animation */}
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
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#151B28]/80 transition-all duration-200 rounded-xl"
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
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#151B28]/80 transition-all duration-200 rounded-xl"
              >
                <item.icon className="mr-2 h-4 w-4 text-[#0050FF]" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Optional: Floating icon or tagline */}
        <div className="text-sm text-gray-500 text-center mt-6">
          Code with <span className="text-[#0050FF] font-semibold">Pulse ⚡</span>
        </div>
      </div>
    </aside>
  );
};
