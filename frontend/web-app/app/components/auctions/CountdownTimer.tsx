'use client';
import { useBidStore } from '@/hooks/useBidStore';
import { usePathname } from 'next/navigation';
import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

type RendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

// Renderer callback with condition
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: RendererProps) => {
  return (
    <div
      className={`border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center
    ${
      completed
        ? 'bg-red-600'
        : days === 0 && hours < 10
        ? 'bg-amber-600'
        : 'bg-green-600'
    }
    `}
    >
      {completed ? (
        <span>Auction finished</span>
      ) : (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    </div>
  );
};

type Props = {
  auctionEnd: string;
};

function CountdownTimer({ auctionEnd }: Props) {
  const setOpen = useBidStore((state) => state.setOpen);
  const pathname = usePathname();

  function auctionFinished() {
    if (pathname.startsWith('/auctions/details')) {
      setOpen(false);
    }
  }

  return (
    <div>
      <Countdown
        date={auctionEnd}
        renderer={renderer}
        onComplete={auctionFinished}
      />
    </div>
  );
}

export default CountdownTimer;
