"use client";

import React, { useEffect, useState } from "react";
import HotelForm from "../hotelForm";
import { useAppSelector } from "@/store/hooks";
import { HotelProps } from "@/types/general";

function EditHotel({ uuid }: { uuid: string }) {
  const [hotelData, setHotelDta] = useState<HotelProps | undefined>(undefined);
  const { hotels } = useAppSelector((state) => state.general);
  useEffect(() => {
    const findHotel =
      hotels?.length > 0 && hotels?.find((hotel) => hotel.uuid === uuid);
    if (findHotel) {
      setHotelDta(findHotel);
    }
  }, [uuid, hotels]);
  return (
    <div className="flex flex-col items-center w-full mt-36 sm:mt-24 justify-center px-4 gap-4">
      <h3 className="text-secondary text-2xl font-extrabold">
        EDIT <span className="text-primary font-bold">{hotelData?.title}</span>
      </h3>
      <HotelForm hotelData={hotelData} />
    </div>
  );
}

export default EditHotel;
