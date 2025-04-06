import { Button } from "@/components/ui/button";
import {
  Plus,
  Home,
  Code2,
  Rocket,
  Users2,
  Activity,
  Book,
  Layout
} from "lucide-react";
import { CreateProjectDialog } from "./CreateProject";
import { TProjectCard } from "./types";

export const SideBar = ({SetProjects , Projects}:any) => {
 
        const handleCreateProject = (project: TProjectCard) => {
          SetProjects([...Projects, project]);
        };
      
  return (
    <aside className="relative w-64 bg-[#0D1119] h-[calc(100vh-4rem)] p-4 overflow-hidden group">
      {/* Metallic overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/5 to-transparent pointer-events-none" />
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100  bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000" />
      
      {/* Sidebar content */}
      <div className="relative z-10">
      <CreateProjectDialog onCreateProject={handleCreateProject} />

        <nav className="space-y-1">
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
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#151B28]"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}

          <div className="pt-4 mt-4 border-t border-[#1a1f2e]">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Explore</h3>
            {[
              { icon: Layout, label: "Templates" },
              { icon: Book, label: "Documentation" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#151B28]"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};