"use client";
import React, { useEffect } from "react";
import SearchInput from "../ui/SearchInput";
import Link from "next/link";
import Logo from "../ui/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategories, setHotelData } from "@/store/slices/generalSlice";
import { usePathname, useRouter } from "next/navigation";
import { HotelProps } from "@/types/general";

const TopNav = () => {
  const dispatch = useAppDispatch();
  const { update } = useAppSelector((state) => state.general);
  const pathname = usePathname();

  useEffect(() => {
    const hotelData = localStorage.getItem("hotels");
    const categoriesData = localStorage.getItem("categories");
    const categories: { title: string }[] = categoriesData
      ? JSON.parse(categoriesData)
      : [];

    const hotels: HotelProps[] = hotelData ? JSON.parse(hotelData) : [];
    dispatch(setHotelData(hotels));
    dispatch(setCategories(categories));
  }, [dispatch, update]);

  return (
    <div className="     mb-12">
      <div className="fixed bg-white z-50 top-0 left-0 right-0">
        <div className="px-4 py-5 sm:px-12 container mx-auto">
          <nav className="flex justify-between flex-col sm:flex-row items-end sm:items-center border-b-2 gap-3 sm:gap-0 border-primary pb-2  ">
            <div className="flex gap-8 justify-between sm:justify-normal w-full  sm:gap-14 items-center">
              <Link href={"/"} className="">
                <Logo />
              </Link>
              <SearchInput />
            </div>

            {pathname.includes("edit") || pathname.includes("create") ? (
              <Link
                href={"/"}
                className="text-primary hover:text-primary/90 font-bold cursor-pointer whitespace-nowrap"
              >
                View Hotels
              </Link>
            ) : (
              <Link
                href={"/hotels/create"}
                className="text-primary hover:text-primary/90 font-bold cursor-pointer whitespace-nowrap"
              >
                Create Hotel
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
