// components/Hero7.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero7() {
  const projects = [
    {
      title: "AI ChatBot",
      language: "Python",
      description:
        "A conversational AI bot that understands natural language and provides intelligent, real-time responses.",
      color: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      title: "Blog WebApp",
      language: "JavaScript",
      description:
        "A dynamic blogging platform with markdown support, real-time previews, and user authentication.",
      color: "from-green-400 via-teal-400 to-blue-500",
    },
    {
      title: "Library Database",
      language: "SQL",
      description:
        "A fully optimized relational database system for managing digital and physical library inventories.",
      color: "from-amber-400 via-orange-500 to-red-500",
    },
    {
      title: "Portfolio Website",
      language: "React",
      description:
        "A modern portfolio showcasing projects, skills, and contact info with smooth transitions and animations.",
      color: "from-fuchsia-500 via-purple-600 to-indigo-600",
    },
    {
      title: "E-Commerce App",
      language: "Node.js",
      description:
        "A scalable full-stack e-commerce solution with cart, payment gateway, and admin dashboard.",
      color: "from-lime-400 via-emerald-400 to-teal-500",
    },
    {
      title: "Cloud Sync Tool",
      language: "Go",
      description:
        "A lightning-fast tool for secure, real-time synchronization of files across multiple cloud services.",
      color: "from-sky-400 via-indigo-500 to-violet-600",
    },
  ];

  return (
    <div className="w-full py-8 px-4 bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[RedWing-M]" >
          Showcase Your Projects with Ease
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mx-auto mb-6 rounded-full" />
        <p className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
          Discover a platform where your projects take center stage. With
          Codepulse, you can effortlessly showcase your work, collaborate with
          fellow developers in real-time, and receive valuable feedback to
          refine your creations. Our intuitive interface and powerful tools make
          project management a breeze, allowing you to focus on what matters
          most—building amazing software.
        </p>

        {/* Projects Grid */}
        <div className="relative mb-12 rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-[0_0_60px_rgba(0,0,0,0.4)] border border-[#2a2a3c]/60 bg-[#121217]/60 backdrop-blur-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a3c]/60 bg-[#1a1a1f]/60 backdrop-blur">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg" />
            </div>
            <div className="text-gray-500 text-sm">project/editor.js</div>
            <div className="text-gray-500 text-sm">JavaScript</div>
          </div>

          <div className="p-8 bg-gradient-to-b from-[#1a1a27] to-[#0d0d17] min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="rounded-2xl shadow-xl border-none overflow-hidden bg-gradient-to-br from-[#1a1a1f] to-[#0d0d14] hover:scale-105 transition-transform duration-300">
                    {/* Gradient header strip */}
                    <div
                      className={`h-2 w-full bg-gradient-to-r ${project.color}`}
                    />
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between p-3 border-b border-[#2a2a3c]/60 bg-[#1a1a27]/60 backdrop-blur-sm rounded-t-2xl">
                        <div className="flex items-center space-x-2">
                          <Code2 className="w-4 h-4 text-gray-400" />
                          <span className="text-base  font-bold text-gray-200">
                            {project.title}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`bg-gradient-to-r ${project.color} text-white shadow-md text-xs border-0 px-2 py-1 rounded`}
                        >
                          {project.language}
                        </Badge>
                      </div>

                      <div className="p-4 space-y-4 text-left">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <Button
                          variant="outline"
                          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-pink-600 hover:to-purple-700 transition-all shadow-md px-4 py-2 rounded"
                        >
                          View Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
