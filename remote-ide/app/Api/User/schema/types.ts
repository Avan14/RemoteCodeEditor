import { z } from "zod";

export type FileTreeType = {
    id: string;
    name: string;
    type: "Folder" | "File";
    code: string;
    children: FileTreeType[];
};

const FileTreeSchemaType: z.ZodType<FileTreeType> = z.lazy(() => z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["Folder", "File"]),
    code: z.string(),
    children: z.array(FileTreeSchemaType),
}));

const ProjectSchemaType = z.object({
    project_id: z.string(),
    name: z.string(),
    type: z.string(),
    date: z.coerce.date(),
    language: z.string(),
    folder: FileTreeSchemaType,
});

const UserSchemaType = z.object({
    id: z.string(),
    name: z.string(),
    projects: z.array(ProjectSchemaType),
});

export { FileTreeSchemaType, ProjectSchemaType, UserSchemaType };

const exampleUser = {
    id: "user_123",
    name: "John Doe",
    projects: [
        {
            project_id: "proj_456",
            name: "AI Chatbot",
            type: "Web Application",
            date: new Date("2024-04-03"),
            language: "TypeScript",
            folder: {
                id: "folder_1",
                name: "src",
                type: "Folder",
                code: "",
                children: [
                    {
                        id: "file_1",
                        name: "index.ts",
                        type: "File",
                        code: "console.log('Hello, World!');",
                        children: []
                    },
                    {
                        id: "folder_2",
                        name: "components",
                        type: "Folder",
                        code: "",
                        children: [
                            {
                                id: "file_2",
                                name: "Chatbot.tsx",
                                type: "File",
                                code: "export function Chatbot() { return <div>Chatbot</div>; }",
                                children: []
                            }
                        ]
                    }
                ]
            }
        }
    ]
};


