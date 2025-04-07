import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Technologies = [
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "🔷" },
  { name: "HTML", icon: "🟧" },
  { name: "CSS", icon: "🟪" },
  { name: "React", icon: "⚛️" },
  { name: "Angular", icon: "🅰️" },
  { name: "Vue", icon: "🟩" },
  { name: "Node.js", icon: "🟢" },
  { name: "SQL", icon: "💾" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Cpp", icon: "👾" },
  { name: "Javascript", icon: "🟨" },
  { name: "Python", icon: "🐍" },
  { name: "Java", icon: "☕" },
  { name: "Csharp", icon: "💻" },
  { name: "Typescript", icon: "🔷" },
  { name: "Php", icon: "🐘" },
  { name: "Go", icon: "🐹" },
  { name: "Ruby", icon: "💎" },
  { name: "Rust", icon: "🦀" },
  { name: "Kotlin", icon: "🤖" },
  { name: "Swift", icon: "🦅" },
  { name: "Sqlite3", icon: "🟪" },
  { name: "C", icon: "📘" },
  { name: "Powershell", icon: "💠" },
  { name: "Bash", icon: "🐚" },
  { name: "Matl", icon: "📐" },
  { name: "Dart", icon: "🎯" },
];

export default function Hero() {
  const techSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const container = techSectionRef.current;
          if (container) {
            // Scroll to the right
            container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });

            // Scroll back to original position after 3s
            setTimeout(() => {
              container.scrollTo({ left: container.scrollWidth/5, behavior: "smooth" });
            }, 2000);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (techSectionRef.current) {
      observer.observe(techSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="group relative bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] p-8 rounded-xl shadow-lg w-4/5 m-auto mt-8 overflow-hidden border-2 border-gray-900">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000" />
      
      <div className="relative z-10 text-white">
        <h1 className="text-8xl font-bold m-auto my-6 font-[Redwing-M]">
          Focus on your code.
        </h1>
        <h1 className="text-6xl font-bold text-blue-700 font-[Redwing-M]">
          Let CodePulse do the rest.
        </h1>

        <div className="mt-6 bg-gray-900 p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0050FF]/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform" />

          <h2 className="relative text-3xl font-semibold">
            Ready to use out of the box
          </h2>
          <p className="relative mt-2 text-gray-300">
            Get straight to coding without having to install and configure lots
            of plugins. WebStorm includes everything you need for JavaScript
            and TypeScript development right from the start.
          </p>

          {/* Horizontal scroll container for technology cards */}
          <div ref={techSectionRef} className="relative mt-6 overflow-x-auto whitespace-nowrap scroll-smooth">
            <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-4">
              {Technologies.map((tech) => (
                <Card
                  key={tech.name}
                  className="group relative bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] p-4 rounded-lg shadow-md overflow-hidden min-w-[120px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform" />
                  
                  <CardContent className="relative text-3xl text-center">
                    {tech.icon}
                  </CardContent>
                  <p className="relative text-white mt-2 text-center text-sm">
                    {tech.name}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
