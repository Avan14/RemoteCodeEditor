"use client";

import { useState } from "react";
import { Search, FileCode2, Command, Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "./ProjectCard";
import { SideBar } from "./sidebar";
import Link from "next/link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-screen bg-black text-white ">
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 p-4 h-1/8 bg-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileCode2 className="h-6 w-6 text-blue-500" />
            <Link href={"/"}>
            <Button className=" font-[Redwing-M] text-2xl  bg-black w-20">HOME</Button>
            </Link>
            <div className="relative w-96">
              <Input
                type="text"
                placeholder="Search & run commands"
                className="w-full border-gray-700 focus:border-blue-500 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <span className="absolute right-3 top-2.5 text-sm text-gray-400">
                Ctrl ⌘
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Command className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              A
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-full bg-black ">
        {/* Sidebar */}
        <SideBar></SideBar>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto ">
          <h1 className="text-3xl font-bold mb-8 ">Welcome to Editor</h1>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard searchQuery={searchQuery}></ProjectCard>
          </div>
        </main>
      </div>
    </div>
  );
}
