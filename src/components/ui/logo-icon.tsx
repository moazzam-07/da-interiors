import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="18"
        className="stroke-accent/60 fill-accent/10"
        strokeWidth="2.5"
      />
      <path
        d="M26 28V72M26 28H42C54 28 62 37 62 50C62 63 54 72 42 72H26"
        className="stroke-foreground"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 72L64 28L80 72"
        className="stroke-accent"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55 57H73"
        className="stroke-accent"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
