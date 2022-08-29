import { forwardRef } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...rest }, ref) => (
    <button
      className="px-3 py-1 font-semibold text-gray-200 bg-teal-600 rounded-sm shadow-sm"
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export default Button;
