import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WhatsAppIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export function FacebookIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function DirectionalArrowIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ExternalArrowIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function CopyIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  );
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function ChevronIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}

export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function CapabilityIcon({
  kind,
  className,
}: {
  kind: "web" | "mobile" | "platform" | "backend";
  className?: string;
}) {
  if (kind === "web") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        {...STROKE_PROPS}
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 20h8" />
        <path d="M12 18v2" />
      </svg>
    );
  }
  if (kind === "mobile") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        {...STROKE_PROPS}
      >
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M11 18.5h2" />
        <path d="M7 6.5h10" />
      </svg>
    );
  }
  if (kind === "platform") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        {...STROKE_PROPS}
      >
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" />
        <rect x="13" y="10" width="8" height="11" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE_PROPS}
    >
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
      <path d="M11 7h6" />
      <path d="M11 17h6" />
    </svg>
  );
}
