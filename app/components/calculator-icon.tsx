import type { CalculatorIcon } from "../lib/calculadoras/catalog";

type CalculatorIconProps = {
  icon: CalculatorIcon;
  className?: string;
};

export function CalculatorIconGlyph({
  icon,
  className = "h-6 w-6",
}: CalculatorIconProps) {
  switch (icon) {
    case "briefcase":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "money":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 3v18" />
          <path d="M17 7.5A4.5 4.5 0 0 0 7.5 9H6a4 4 0 0 0 0 8h1.5A4.5 4.5 0 0 0 17 16.5" />
        </svg>
      );
    case "beach":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M3 20h18" />
          <path d="M7 20l2-8 3 4 2-6 3 10" />
          <path d="M14 4l1 2 2-1-1 2 2 1-2 1 1 2" />
        </svg>
      );
    case "calendar":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
          <path d="M8 15h2v2H8z" />
        </svg>
      );
    case "clock":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "umbrella":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 13v8" />
          <path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9Z" />
        </svg>
      );
  }
}
