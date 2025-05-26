import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export const PasswordInput = ({ className, ...props }: React.ComponentProps<"input">) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = useCallback(() => {
        setIsVisible((isVisible) => !isVisible)
    }, []);

    return <div className="relative">
        <input
            type={isVisible ? "text" : "password"}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
        <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
        >
            <span>
                {isVisible ? "숨김" : "표시"}
            </span>
        </button>
    </div>
}