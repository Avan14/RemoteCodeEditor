"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectDialogProps {
  onCreateProject: (data: {
    name: string;
    track: "WebDevelopment" | "SoftWareDevelopment";
  }) => void;
}

export function CreateProjectDialog({
  onCreateProject,
}: CreateProjectDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [track, setTrack] = useState<"WebDevelopment" | "SoftWareDevelopment">(
    "WebDevelopment"
  );

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Invalid name",
        description: "Project name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    onCreateProject({ name, track });

    toast({
      title: "Project Created",
      description: `Project "${name}" created successfully.`,
    });

    setOpen(false);
    setName("");
    setTrack("WebDevelopment");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-[#0050FF] hover:bg-[#0040CC] mb-6"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Provide basic details for your new project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="track" className="text-right">
              Track
            </label>
            <Select
              value={track}
              onValueChange={(value) =>
                setTrack(value as "WebDevelopment" | "SoftWareDevelopment")
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select project track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WebDevelopment">Web Development</SelectItem>
                <SelectItem value="SoftWareDevelopment">
                  Software Development
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
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
