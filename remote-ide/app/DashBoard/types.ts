import { FILE_NAMES } from "@/components/Constants/constants"

type FILE_NAMES_type = typeof FILE_NAMES

export type TProjectCard = {
    id: string,
    name: string,
    type: string,
    date: Date,
    language: string
}


  