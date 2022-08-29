import { forwardRef } from "react";

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, Props>(({ children, ...rest }, ref) => (
  <button className="bg-teal-600 text-gray-200 px-3 py-1 shadow-sm font-semibold rounded-sm" {...rest} ref={ref}>
    {children}
  </button>
))
Button.displayName = 'Button'

export default Button