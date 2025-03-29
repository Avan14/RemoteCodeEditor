import React, { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


interface AlertMessage {
  type: "success" | "error";
  title: string;
  description: string;
}

export const groupChat = (): any => {
   const [groups, setGroups] = useState([
    { id: 1, name: "JavaScript Study Group", members: 5 },
    { id: 2, name: "Algorithm Practice", members: 3 },
  ]);

  const [alert, setAlert] = useState<AlertMessage | null>(null);
  const xmlDoc = document.implementation.createDocument("", "", null);
  const handleCreateGroup = () => {
    const groupName = prompt("Enter group name:");
    if (groupName) {
      setGroups([
        ...groups,
        {
          id: groups.length + 1,
          name: groupName,
          members: 1,
        },
      ]);
      setAlert({
        type: "success",
        title: "Group Created",
        description: `Successfully created group "${groupName}"`,
      });
      setTimeout(() => setAlert(null), 3000);
    } else {
      setAlert({
        type: "error",
        title: "Error",
        description: "Group name cannot be empty",
      });
      return xmlDoc;
    }
  };
  const handleJoinGroup = (groupId: number) => {
    const group = groups.find((g) => g.id === groupId);
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, members: group.members + 1 } : group
      )
    );
    if (group) {
      setAlert({
        type: "success",
        title: "Joined Group",
        description: `Successfully joined "${group.name}"`,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };
};
