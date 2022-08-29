import React from "react"
import { Children } from "react"
import { chipPositions } from "../../data/chipPositions"

interface Props {
  children: React.ReactNode
}

const Cauldron = ({ children }: Props) => {
  const childArray = React.Children.toArray(children)

  return (
    <div className="cauldron">
      <img src="/assets/black-cauldron.png" alt="" />
      <div>
        {childArray.map((child) => {
          if (typeof child === 'string' || typeof child === 'number') return null
          const chipPosition = chipPositions[child.props.position]

          return React.cloneElement(child, {
            style: {
              left: `${chipPosition?.left}%`,
              top: `${chipPosition?.top}%`,
            }
          }, null)
        })}
        {/* {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            style: {
              top: '0px',
            }
          }, null)
        })} */}
      </div>
    </div >
  )
}

export default Cauldron