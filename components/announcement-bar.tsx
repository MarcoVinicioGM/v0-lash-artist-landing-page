"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-zinc-100 px-4 py-2.5 text-center">
      <p className="font-serif text-xs tracking-wide text-zinc-700 sm:text-sm">
        Complimentary Shipping on Orders Over $50 | New NOLA Studio Opening Soon
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 transition-colors hover:text-zinc-800"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
