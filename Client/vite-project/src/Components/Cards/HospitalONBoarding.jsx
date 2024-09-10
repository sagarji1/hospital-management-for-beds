import * as React from "react";

import Box from "@mui/joy/Box";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

import Typography from "@mui/joy/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

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
        <LocalHospitalIcon />
      </Box>
      <CardContent>
        <Typography level="title-lg">Hospital On Boarding</Typography>
        <Typography level="body-sm">
          Hospitals can come on board this platform and provide their
          appointment slots for online booking by patients. The system
          facilitates Hospitals to easily manage their registration and
          appointment process and monitor the flow of patients.
        </Typography>
      </CardContent>
    </Card>
  );
}
