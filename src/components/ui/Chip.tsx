import { chips } from "../../data/gameData"

interface Props {
  id: string
  position: number
}

const Chip = ({ id, ...rest }: Props) => {
  const { color, value } = chips[id]!

  return <div data-color={color} {...rest} className="chip rounded-full text-white grid place-items-center">
    <span>{value}</span>
  </div>
}
export default Chip