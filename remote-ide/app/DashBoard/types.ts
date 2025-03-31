import { FILE_NAMES } from "@/components/Constants/constants"

type FILE_NAMES_type = typeof FILE_NAMES

export type TProjectCard = {
    id: string,
    name: string,
    type: string,
    date: Date,
    language: string
}

export const projectcard_example = [
    {
      id: "1",
      name: "First React Project",
      type: "WebDev",
      date: new Date(),
      language: "React",
    },
    {
      id: "2",
      name: "First C++ Project",
      type: "SoftwareDev",
      date: new Date(),
      language: "cpp",
    },
    {
      id: "3",
      name: "E-commerce Platform",
      type: "WebDev",
      language: "TypeScript",
      date: new Date("2024-03-15"),
    },
    {
      id: "4",
      name: "Task Management API",
      type: "SoftwareDev",
      language: "Node.js",
      date: new Date("2024-03-10"),
    },
    {
      id: "5",
      name: "Mobile Weather App",
      type: "SoftwareDev",
      language: "React Native",
      date: new Date("2024-03-05"),
    },
    {
      id: "6",
      name: "Portfolio Website",
      type: "WebDev",
      language: "JavaScript",
      date: new Date("2024-02-20"),
    },
    {
      id: "7",
      name: "AI Chatbot",
      type: "SoftwareDev",
      language: "Python",
      date: new Date("2024-01-25"),
    },
    {
      id: "8",
      name: "Cloud Storage System",
      type: "SoftwareDev",
      language: "Go",
      date: new Date("2024-02-15"),
    },
  ];
  