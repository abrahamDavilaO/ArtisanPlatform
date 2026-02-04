"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hover?: boolean;
}

export function Card({ className, children, hover = true, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl bg-white shadow-md overflow-hidden transition-all duration-500",
                hover && "hover:shadow-xl hover:-translate-y-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    gradient?: string;
}

export function CardImage({ className, src, alt, gradient, ...props }: CardImageProps) {
    return (
        <div
            className={cn(
                "relative aspect-[4/5] overflow-hidden group",
                className
            )}
            {...props}
        >
            {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={alt || ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div
                    className={cn(
                        "w-full h-full transition-transform duration-700 group-hover:scale-105",
                        gradient || "bg-gradient-to-br from-amber-200 to-amber-400"
                    )}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
    return (
        <div className={cn("p-6", className)} {...props}>
            {children}
        </div>
    );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
    return (
        <h3
            className={cn(
                "font-serif text-xl font-semibold text-neutral-900 mb-2",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
    return (
        <p
            className={cn("text-neutral-600 text-sm leading-relaxed", className)}
            {...props}
        >
            {children}
        </p>
    );
}
