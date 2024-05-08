import React from "react";
import EditHotel from "../EditHotel";

function Page({ params }: { params: { uuid: string } }) {
  return <EditHotel uuid={params.uuid} />;
}

export default Page;
