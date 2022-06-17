import { FC } from "react";

interface ButtonProps {
  className?: string;
  icon: string;
  [x: string]: any;
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  icon,
  className,
  children,
  ...props
}) => {
  return (
    <button className={`btn btn-sm action-btn ${className}`} {...props}>
      <i className={icon}></i>
      &nbsp; {children}
    </button>
  );
};
