'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h2 className="font-serif text-2xl mb-4 text-zinc-900">Something went wrong</h2>
        <p className="text-zinc-500 mb-6">We apologize for the inconvenience. Please try again.</p>
        <Button onClick={() => reset()} className="bg-zinc-900 hover:bg-zinc-800">
          Try again
        </Button>
      </div>
    </main>
  );
}
