import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Technologies = [
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "HTML" },
  { name: "CSS" },
  { name: "React" },
  { name: "Angular" },
  { name: "Node.js" },
  { name: "MongoDB" },
  { name: "Cpp" },
  { name: "Javascript" },
  { name: "Python" },
  { name: "Java" },
  { name: "Csharp" },
  { name: "Typescript" },
  { name: "Php" },
  { name: "Go" },
  { name: "Ruby" },
  { name: "Rust" },
  { name: "Kotlin" },
  { name: "Swift" },
  { name: "Sqlite3" },
  { name: "C" },
  { name: "Powershell" },
  { name: "Bash" },
  { name: "Matl" },
  { name: "Dart" },
];

export default function Hero() {
  const techSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = techSectionRef.current;
    if (!container) return;

    const scrollAmount = container.scrollWidth ;

    const scrollSmoothly = () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        container.scrollBy({ left: -scrollAmount , behavior: "smooth" });
      }, 2000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          scrollSmoothly();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#0a0a0a] p-8 rounded-3xl shadow-2xl w-[90%] m-auto mt-12 border border-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />

      <div className="relative z-10 text-white space-y-6">
        <h1 className="text-6xl lg:text-8xl font-extrabold font-[Redwing-M] text-white">
          Focus on your code.
        </h1>
        <h2 className="text-4xl lg:text-6xl font-bold text-[#5ea2ff] font-[Redwing-M]">
          Let CodePulse do the rest.
        </h2>

        <div className="mt-8 bg-[#0e0e0e]/60 backdrop-blur-lg border border-[#1f1f1f] p-8 rounded-2xl relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0050FF]/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform" />

          <h2 className="relative text-3xl font-semibold text-white">
            Ready to use out of the box
          </h2>
          <p className="relative mt-3 text-gray-400 text-lg">
            Get straight to coding without having to install and configure lots
            of plugins. CodePulse includes everything you need for modern
            development.
          </p>

          <div
            ref={techSectionRef}
            className="relative mt-8 overflow-x-auto whitespace-nowrap scroll-smooth will-change-transform"
          >
            <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-4">
              {Technologies.map((tech, idx) => (
                <Card
                  key={tech.name + idx}
                  className="group relative bg-[#0e0e0e]/60 border border-[#1f1f1f] backdrop-blur-md rounded-xl p-4 shadow-md hover:shadow-blue-500/30 transition-shadow duration-300 min-w-[120px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform" />

                  <CardContent className="relative text-4xl text-center animate-float">
                  <img src={`/icons/${tech.name}.png`} alt={tech.name} className="w-12 h-12 mx-auto" />


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

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
