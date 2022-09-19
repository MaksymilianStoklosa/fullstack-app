import { FC, ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
}

export const Error: FC<ErrorProps> = ({ children }: ErrorProps) => <p className="error">{children}</p>;
