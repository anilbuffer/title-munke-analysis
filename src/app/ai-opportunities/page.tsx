'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AIOpportunitiesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ai-opportunity');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 text-stone-500 font-sans text-sm">
      Redirecting to AI Opportunity...
    </div>
  );
}
