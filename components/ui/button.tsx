import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-secondary py-2 px-4 font-bold hover:bg-secondary/70 hover:text-primary/70 transition-transform duration-150 ease-in-out rounded-lg text-primary text-lg uppercase ",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
