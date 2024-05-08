"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/navigation";

const HotelCard = ({ hotel }: { hotel: HotelProps }) => {
  const router = useRouter();
  const handleHotelClick = () => {
    router.push(`/hotels/${hotel.uuid}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleHotelClick}>
        <CardMedia
          component="img"
          height="140"
          className="h-60"
          image={hotel.image}
          alt={hotel.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            className="font-bold"
            component="div"
          >
            {hotel.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="text-primary font-bold">Country:</span>{" "}
            {hotel.country} <br />
            <span className="text-primary font-bold">Address:</span>{" "}
            {hotel.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HotelCard;
