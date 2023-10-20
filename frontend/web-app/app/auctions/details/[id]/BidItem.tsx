import { Bid } from '@/types';
import { format } from 'date-fns';
import React from 'react';
import { numberWithCommas } from '@/lib/numberWithComma';

type Props = {
  bid: Bid;
};

function BidItem({ bid }: Props) {
  function getBidInfo() {
    let bgColor = '';
    let text = '';
    switch (bid.bidStatus) {
      case 'Accepted':
        bgColor = 'bg-green-200';
        text = 'Bid accepted';
      case 'AcceptedBelowReserve':
        bgColor = 'bg-amber-500';
        text = 'Reserve not met';
      case 'TooLow':
        bgColor = 'bg-red-200';
        text = 'Bid was too low';
      default:
        bgColor = 'bg-red-200';
        text = 'Bid placed after auction finished';
    }

    return { bgColor, text };
  }

  return (
    <div
      className={`border-gray-300 border-2 px-2 py-2 rounded-lg flex justify-between items-center mb2 ${
        getBidInfo().bgColor
      }`}
    >
      <div className="flex flex-col">
        <span>Bidder: {bid.bidder}</span>
        <span className="text-gray-700 text-sm">
          Time: {format(new Date(bid.bidTime), 'dd MMM yyyy h:mm a')}
        </span>
      </div>
      <div className="flex flex-col text-right">
        <div className="text-xl font-semibold">
          ${numberWithCommas(bid.amount)}
        </div>
        <div className="flex flex-row items-center">
          <span>{getBidInfo().text}</span>
        </div>
      </div>
    </div>
  );
}

export default BidItem;