"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "link";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "relative overflow-hidden group",

                    // Variants
                    {
                        "bg-neutral-900 text-white hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5":
                            variant === "primary",
                        "bg-transparent text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white":
                            variant === "secondary",
                        "bg-transparent hover:bg-neutral-100": variant === "ghost",
                        "bg-transparent underline-offset-4 hover:underline text-neutral-900":
                            variant === "link",
                    },

                    // Sizes
                    {
                        "px-4 py-2 text-sm": size === "sm",
                        "px-6 py-3 text-base": size === "md",
                        "px-8 py-4 text-lg": size === "lg",
                    },

                    className
                )}
                ref={ref}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
