"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpecItem {
    title: string;
    content: React.ReactNode;
}

interface ProductSpecsAccordionProps {
    items: SpecItem[];
}

export function ProductSpecsAccordion({ items }: ProductSpecsAccordionProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={item.title}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex w-full items-center justify-between py-5 text-left"
                        >
                            <span className="font-serif text-xl font-semibold text-neutral-900">
                                {item.title}
                            </span>
                            <span className="text-2xl text-neutral-400">{isOpen ? "−" : "+"}</span>
                        </button>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300",
                                isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="text-sm leading-7 text-neutral-600">{item.content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
