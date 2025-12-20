// types 

export type TProjectCard = {
  id: string
  name: string
  slug?: string
  track: 'WebDevelopment' | 'SoftWareDevelopment'
  createdAt: string
}

// interfaces

export interface SideBarProps {
  Projects: TProjectCard[]
  SetProjects: React.Dispatch<React.SetStateAction<TProjectCard[]>>
  TriggerRefresh?: () => void
}
