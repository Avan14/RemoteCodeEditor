"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Technologies = [
  "JavaScript", "TypeScript", "HTML", "CSS", "React", "Angular", "Node.js", "MongoDB",
  "Cpp", "Python", "Java", "Csharp", "Php", "Go", "Ruby", "Rust", "Kotlin", "Swift",
  "Sqlite3", "C", "Powershell", "Bash", "Matl", "Dart"
];

export default function Hero() {
  const techSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = techSectionRef.current;
    if (!container) return;

    const scrollAmount = container.scrollWidth;

    const scrollSmoothly = () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }, 2000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) scrollSmoothly();
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-[#000] p-8 rounded-3xl w-[90%] m-auto mt-16 border  border-[#8f8c8c] overflow-hidden">
      <div className="relative z-10 text-white space-y-6">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-[Redwing-M]">
          Focus on your code.
        </h1>
        <h2 className="text-3xl lg:text-5xl font-bold text-neutral-400 font-[Redwing-M] tracking-tight">
          Let CodePulse do the rest.
        </h2>

        <div className="mt-10 bg-[#0a0a0a] border border-[#4d4d4d] p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold text-white  font-[Redwing-L]">
            Ready to use out of the box
          </h2>
          <p className="mt-2 text-neutral-400 text-base">
            Get straight to coding without installing and configuring tons of plugins.
            CodePulse includes everything you need for modern development.
          </p>

          <div
            ref={techSectionRef}
            className="mt-8 overflow-x-auto whitespace-nowrap scroll-smooth pb-2"
          >
            <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-6 px-1">
              {Technologies.map((name, idx) => (
                <Card
                  key={name + idx}
                  className="bg-[#101010] border border-[#1a1a1a] rounded-xl p-4 min-w-[120px] hover:border-neutral-700 transition-colors duration-200"
                >
                  <CardContent>
                    <img
                      src={`/icons/${name}.png`}
                      alt={name}
                      className="w-12 h-12 mx-auto object-contain"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <p className="text-neutral-200 mt-2 text-center text-sm tracking-wide">
                      {name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
