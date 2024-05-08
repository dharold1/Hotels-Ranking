import React from "react";
import HotelForm from "../hotelForm";

const CreateHotel = () => {
  return (
    <div className="flex flex-col w-full mt-36 sm:mt-24 items-center justify-center px-4 gap-4">
      <h1 className="text-secondary text-2xl font-extrabold">
        CREATE <span className="text-primary font-bold">Hotel</span>
      </h1>
      <HotelForm />
    </div>
  );
};

export default CreateHotel;
