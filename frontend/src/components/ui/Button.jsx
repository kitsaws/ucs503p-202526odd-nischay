import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-between gap-4 px-4 py-2 font-semibold focus:outline-none transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:opacity-90",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white",
        border: "border border-border",
        ghost: "hover:bg-muted",
      },
      size: {
        sm: "px-3 py-1 text-sm rounded-md",
        md: "px-4 py-2 rounded-lg",
        lg: "px-5 py-3 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: 'md'
    },
  }
)

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? "span" : "button"; // span acts as wrapper when used inside <Link>
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
