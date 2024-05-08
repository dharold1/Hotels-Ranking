"use client";
import Image from "next/image";
import React from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

function ListEmpty() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center h-full w-full items-center ">
      <div className="relative h-56 w-56 ">
        <Image
          objectFit="cover"
          src={"/assets/images/empty.png"}
          alt="empty"
          fill
        />
      </div>
      <div>
        <p className="text-primary font-medium text-lg">
          There&apos;s nothing here
        </p>

        <Button
          onClick={() => {
            router.push("/create");
          }}
        >
          Create Hotel
        </Button>
      </div>
    </div>
  );
}

export default ListEmpty;
