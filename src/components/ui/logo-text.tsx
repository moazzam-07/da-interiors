import type { SVGProps } from "react";

export function LogoText(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 60"
      fill="none"
      {...props}
    >
      <text
        x="0"
        y="32"
        className="fill-foreground font-heading font-black text-[28px] tracking-[0.18em]"
        style={{ letterSpacing: "0.16em" }}
      >
        DA INTERIORS
      </text>
      <text
        x="2"
        y="50"
        className="fill-accent font-sans font-bold text-[10px] tracking-[0.32em] uppercase"
        style={{ letterSpacing: "0.32em" }}
      >
        Architecture & Living
      </text>
    </svg>
  );
}
