import Image from "next/image";
import React from "react";
import SearchInput from "../ui/SearchInput";
import Link from "next/link";

const TopNav = () => {
  return (
    <div className="px-4 sm:px-12 py-4 container mx-auto">
      <nav className="flex justify-between items-center border-b-2 gap-3 sm:gap-0 border-primary pb-2">
        <div className="flex gap-3 sm:gap-10 items-center">
          <Link href={"/"} className="relative w-12 h-12 sm:w-16 sm:h-16">
            <Image
              src={"/assets/images/logos/logo_brown.svg"}
              alt="Accommodate Icon"
              fill
            />
          </Link>
          <SearchInput />
        </div>

        <div className="text-primary hover:text-primary/90 font-bold cursor-pointer">
          Create Hotel
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
