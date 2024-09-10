import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

export default function BottomActionsCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        // to make the card resizable
        overflow: "auto",
        resize: "horizontal",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <ElectricBoltIcon />
      </Box>
      <CardContent>
        <Typography level="title-lg">Simple Appointment Process</Typography>
        <Typography level="body-sm">
          For your first visit to hospital, registration and appointment with
          doctor is made simpler. All you have to do is verify yourself using
          ABHA(Ayushman Bharat Health Account), Select Hospital and Department,
          Select date of Appointment and receive SMS for Appointment
        </Typography>
      </CardContent>
      
    </Card>
  );
}
