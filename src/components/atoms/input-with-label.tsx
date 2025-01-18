import React from "react";
import { cn } from "@/lib/cn";

interface InputWithLabelProps {
  id: string;
  label: string;
  type?: string;
  name?: string;
  required?: boolean;
  className?: string;
  classContainer?: string;
  defaultValue?: string
  value?: string;
  leftIcon?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel = ({
  id,
  label,
  type = "text",
  name,
  defaultValue,
  required = false,
  className = "",
  classContainer,
  leftIcon,
  value,
  onChange,
}: InputWithLabelProps) => {
  return (
    <div className={classContainer}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative mt-1">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={cn(
            "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:focus:ring-blue-300 dark:focus:border-blue-300",
            leftIcon ? "!pl-8" : "!pl-2",
            className
          )}
        />
      </div>

    </div>
  );
};
