import React from "react";
import { cn } from "@/lib/utils"; // Função utilitária para unir classes do Tailwind

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ElementType;
}

const Input: React.FC<InputProps> = ({ label, error, icon, ...inputProps }) => {
  return (
    <div className="flex flex-col gap-y-2 mb-5">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-3 flex items-center">
            {React.createElement(icon, {
              className: "h-5 w-5 text-gray-600 dark:text-gray-400",
            })}
          </span>
        )}
        <input
          {...inputProps}
          className={cn(
            "px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            icon ? "pl-10" : ""
          )}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;