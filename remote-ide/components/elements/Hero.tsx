import { Card, CardContent } from "@/components/ui/card";

const technologies = [
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
];

export default function Hero() {
  return (
    <div className="bg-black text-white p-8 rounded-xl shadow-lg w-4/5 m-auto mt-8">
      <h1 className="text-8xl font-bold m-auto my-6 font-[Redwing-M]">Focus on your code.</h1>
      <h1 className="text-6xl font-bold text-blue-700 font-[Redwing-M]"> Let Editor do the rest.</h1>
      <div className="mt-6 bg-blue-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold">Ready to use out of the box</h2>
        <p className="mt-2 text-gray-300">
          Get straight to coding without having to install and configure lots of
          plugins. WebStorm includes everything you need for JavaScript and
          TypeScript development right from the start.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {technologies.map((tech) => (
            <Card
              key={tech.name}
              className="bg-black text-center p-4 rounded-lg"
            >
              <CardContent className="text-3xl">{tech.icon}</CardContent>
              <p className="text-white mt-2">{tech.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
