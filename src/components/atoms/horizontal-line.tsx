import React from "react";
import { cn } from "@/lib/cn";

interface HorizontalLineProps {
  children?: React.ReactNode;
  className?: string;
}

export const HorizontalLine = ({
  children,
  className = "",
}: HorizontalLineProps) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {children ? (
        <>
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500">{children}</span>
          <hr className="flex-grow border-gray-300" />
        </>
      ) : (
        <hr className="flex-grow border-gray-300" />
      )}
    </div>
  );
};
