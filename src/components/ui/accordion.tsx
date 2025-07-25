import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#BA2685] rounded-lg text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-lg px-4 py-3 font-semibold text-left"
      >
        <span>{title}</span>
        <span
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        >
          {/* Chevron SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        className={`text-md text-left px-4 pt-0 pb-3 transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        {children}
      </div>
    </div>
  );
}
