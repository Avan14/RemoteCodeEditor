import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { TProjectCard } from "./types";
import { languageOptions } from "../CodeEditor/[id]/Header";
import { useToast } from "@/hooks/use-toast"; 

interface CreateProjectDialogProps {
  onCreateProject: (project: TProjectCard) => void;
}

export function CreateProjectDialog({ onCreateProject }: CreateProjectDialogProps) {
  const { toast } = useToast(); // Toast function
  const [open, setOpen] = useState(false); // Dialog state
  const [name, setName] = useState("");
  const [type, setType] = useState<"SoftwareDev" | "WebDev">("WebDev");
  const [language, setLanguage] = useState<TProjectCard["language"]>("React");

  const handleSubmit = () => {
    const newProject: TProjectCard = {
      name,
      type,
      date: new Date(),
      language,
    };

    onCreateProject(newProject);
    
    // Show success toast
    toast({
      title: "Project Created",
      description: `New project "${name}" added successfully.`,
    });

    // Close dialog and reset fields
    setOpen(false);
    setName("");
    setType("WebDev");
    setLanguage("React");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#0050FF] hover:bg-[#0040CC] mb-6" size="lg">
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details for your new project. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">Name</label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="type" className="text-right">Type</label>
            <Select value={type} onValueChange={(value: "SoftwareDev" | "WebDev") => setType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WebDev">Web Development</SelectItem>
                <SelectItem value="SoftwareDev">Software Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="language" className="text-right">Language</label>
            <Select 
              value={language} 
              onValueChange={(value: TProjectCard["language"]) => setLanguage(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="h-40">
                {type === "SoftwareDev" ? (
                  languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="React">React</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            className="bg-[#0050FF] hover:bg-[#0040CC]"
          >
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}