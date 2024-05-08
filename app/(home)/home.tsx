"use client";
import ListEmpty from "@/components/layouts/ListEmpty";
import Filter from "@/components/ui/filter";
import HotelCard from "@/components/ui/hotelCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilterOption } from "@/store/slices/generalSlice";
import { HotelProps } from "@/types/general";
import React, { useEffect, useState } from "react";

function Home() {
  const { hotels, categories, filterOption } = useAppSelector(
    (state) => state.general
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFilterOption("All Categories"));
  }, [dispatch]);

  const hotelsInSelectedCategory = hotels.filter(
    (hotel) =>
      (filterOption.length > 0 && filterOption?.includes("Categories")) ||
      hotel.category === filterOption
  );
  return (
    <div className="container  mt-36 sm:mt-24  mx-auto px-4 sm:px-12">
      <div className="flex justify-end w-full">
        <Filter options={categories} defaultOption="Categories" />
      </div>

      {hotelsInSelectedCategory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 sm:gap-4 ">
          {hotelsInSelectedCategory?.map((hotel, index) => (
            <HotelCard hotel={hotel} key={index} />
          ))}
        </div>
      ) : (
        <ListEmpty />
      )}
    </div>
  );
}

export default Home;
