import { UserType } from "@/app/CodeEditor/[id]/FileExplorer/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "user-store",
        }
    )
);
