'use client';

import EmptyFilter from '@/app/components/ui/EmptyFilter';
import React from 'react';

function Page({ searchParams }: { searchParams: { callbackUrl: string } }) {
  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="Please click below to sign in"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}

export default Page;
