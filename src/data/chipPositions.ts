import { z } from "zod"

const chipPositionSchema = z.object({
  id: z.number(),
  top: z.number(),
  left: z.number(),
})
const chipPositionsSchema = z.array(chipPositionSchema)
type ChipPositions = z.infer<typeof chipPositionsSchema>

export const chipPositions: ChipPositions = [
  {
    id: 0,
    left: 48.8,
    top: 40.3,
  },
  {
    id: 1,
    left: 56.5,
    top: 43,
  },
  {
    id: 2,
    left: 62.1,
    top: 37.5,
  },
]