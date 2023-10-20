'use client';

import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import AppPagination from '@/app/components/ui/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import EmptyFilter from '../components/ui/EmptyFilter';
import { useParamsStore } from '@/hooks/useParamsStore';
import { shallow } from 'zustand/shallow';
import { useAuctionStore } from '@/hooks/useAuctionStore';

function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      ...(state.seller && { seller: state.seller }),
      ...(state.winner && { winner: state.winner }),
    }),
    shallow
  );

  const data = useAuctionStore(
    (state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }),
    shallow
  );
  const setData = useAuctionStore((state) => state.setData);

  const setParams = useParamsStore((state) => state.setParams);
  const url = '?' + new URLSearchParams(params as any).toString();

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url.toString()).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [url, setData]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.auctions?.map((auction: any) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Listings;
