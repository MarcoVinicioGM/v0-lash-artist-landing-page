export function GridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] rounded-3xl bg-zinc-200 animate-pulse"
        />
      ))}
    </div>
  );
}

export function AccordionSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-32 rounded-xl bg-zinc-200 animate-pulse" />
      ))}
    </div>
  );
}
