import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Typography } from "@mui/material";
import ViewHotel from "./ViewHotel";

function Page({ params }: { params: { uuid: string } }) {
  return <ViewHotel uuid={params.uuid} />;
}

export default Page;
