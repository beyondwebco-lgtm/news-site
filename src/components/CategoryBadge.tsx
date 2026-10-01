import React from "react";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function CategoryBadge({
  category,
  className = "",
  onClick,
  active = false,
}: CategoryBadgeProps) {
  const baseClasses =
    "inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-sm transition-colors duration-150";

  const colorStyles = active
    ? "bg-neutral-900 text-white"
    : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200/80";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${colorStyles} cursor-pointer ${className}`}
      >
        {category}
      </button>
    );
  }

  return (
    <span className={`${baseClasses} ${colorStyles} ${className}`}>
      {category}
    </span>
  );
}
