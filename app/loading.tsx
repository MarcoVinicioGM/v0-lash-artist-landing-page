export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-zinc-200" />
        <div className="h-4 w-32 rounded bg-zinc-200" />
      </div>
    </div>
  );
}
