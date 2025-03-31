
import { Button } from "@/components/ui/button";
import {
    Search,
    Plus,
    Home,
    Code2,
    Rocket,
    Users2,
    Activity,
    Book,
    Layout,
    FileCode2,
    Command,
  } from "lucide-react";


export const SideBar = ()=>{

    return  <aside className="w-64 bg-[#0D1119] h-[calc(100vh-4rem)] p-4">
    <Button className="w-full bg-[#0050FF] hover:bg-[#0040CC] mb-6" size="lg">
      <Plus className="mr-2 h-4 w-4" /> Create Project
    </Button>

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
  </aside>
}