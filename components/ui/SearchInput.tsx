import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="flex items-center rounded-sm h-10 border-2  bg-white border-primary px-2">
      <div>
        <IoSearchOutline color="#14274A" />
      </div>
      <input
        placeholder="Search"
        type="text"
        className="outline-none px-4 w-full sm:w-72 text-sm text-primary placeholder:text-primary placeholder:text-sm"
      />
    </div>
  );
};

export default SearchInput;
