"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Typography } from "@mui/material";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/button";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { HotelProps } from "@/types/general";
import { toast } from "react-toastify";
import { updateData } from "@/store/slices/generalSlice";

function ViewHotel({ uuid }: { uuid: string }) {
  const [hotelData, setHotelDta] = useState<HotelProps | null>(null);
  const { hotels } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const findHotel =
      hotels?.length > 0 && hotels?.find((hotel) => hotel.uuid === uuid);
    if (findHotel) {
      setHotelDta(findHotel);
    }
  }, [uuid, hotels]);

  const handleDelete = async (uuid: string) => {
    try {
      let existingHotelsJSON = localStorage.getItem("hotels");
      let existingHotels: HotelProps[] = existingHotelsJSON
        ? JSON.parse(existingHotelsJSON)
        : [];

      const indexToDelete = existingHotels.findIndex(
        (hotel) => hotel.uuid === uuid
      );

      if (indexToDelete !== -1) {
        existingHotels.splice(indexToDelete, 1);

        localStorage.setItem("hotels", JSON.stringify(existingHotels));

        toast.success(`Hotel deleted successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        dispatch(updateData());
        router.push("/");
      } else {
        toast.error(`Hotel not found!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(`Error deleting hotel`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error deleting hotel:", error);
    }
  };
  return (
    <div className="container mx-auto max-w-2xl pt-2 px-4">
      <div className="flex justify-start">
        <Link
          href={"/"}
          className="flex hover:text-primary/90 gap-2 items-center font-bold text-lg text-primary"
        >
          <IoArrowBack color="#14274A" /> Back
        </Link>
      </div>
      <Card sx={{ minWidth: 275 }}>
        <CardMedia
          component="img"
          height="140"
          className="h-60"
          image={hotelData?.image}
          alt={hotelData?.title}
        />

        <CardContent>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              className="font-bold"
              component="div"
            >
              {hotelData?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span className="text-primary font-bold">Country:</span>{" "}
              {hotelData?.country} <br />
              <span className="text-primary font-bold">Address:</span>{" "}
              {hotelData?.address}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
      <div className="flex justify-center gap-5 mt-4">
        <Button
          onClick={() => {
            router.push(`/hotels/edit/${hotelData?.uuid}`);
          }}
          className="w-40"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelete(hotelData?.uuid ?? "");
          }}
          className="w-40 bg-red-500 hover:bg-red-500/70 hover:text-white text-white"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ViewHotel;
