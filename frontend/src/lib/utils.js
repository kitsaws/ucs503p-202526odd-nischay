import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and merges Tailwind classes safely.
 * 
 * Example:
 * cn("px-2", condition && "bg-red-500", "text-white")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
