import * as React from "react";

import Box from "@mui/joy/Box";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

import Typography from "@mui/joy/Typography";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

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
        <DashboardCustomizeIcon />
      </Box>
      <CardContent>
        <Typography level="title-lg">Dashboard Reports</Typography>
        <Typography level="body-sm">
          Total number of Hospitals for which appointment can be taken through
          web along with their departments for which online appointment can be
          taken can be seen in reports. Detail reports showing information about
          New and Old patients taking appointment through this portal can be
          seen.
        </Typography>
      </CardContent>
    </Card>
  );
}
