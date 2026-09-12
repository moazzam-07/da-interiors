import { cn } from "@/lib/utils";

interface SectionFrameProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  hasPadding?: boolean;
}

/**
 * Standardized Section Layout component.
 * Uses the Component Composition pattern to separate the section wrapper (for background bleeding)
 * from the inner container (for max-width constraints).
 */
export function SectionFrame({
  children,
  className,
  containerClassName,
  hasPadding = true,
  ...props
}: SectionFrameProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        hasPadding && "py-20 md:py-28 lg:py-32",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "container mx-auto px-6 md:px-12 max-w-7xl",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
