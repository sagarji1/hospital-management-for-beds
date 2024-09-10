import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import "./Hospital.css";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Link } from "react-router-dom";
export default function UserCard() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}>
      <Card
        orientation="horizontal"
        sx={{
          width: "90%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          resize: "horizontal",
          margin: "50px",
        }}>
        <AspectRatio
          flex
          ratio="1"
          maxHeight={182}
          sx={{ minWidth: 182, backgroundColor: "primary" }}>
          <LocalHospitalIcon color="primary" sx={{ fontSize: "4rem" }} />
        </AspectRatio>
        <CardContent>
          <h2>Every Hospitals has moved online, why stay behind ?</h2>

          <div className="space">
            {" "}
            <Box sx={{ display: "flex" }}>
              <div className="space">
                <Button variant="solid" color="danger">
                  ORS OnBoarding Manual
                </Button>
              </div>
              <div className="space">
                <Button
                  variant="solid"
                  color="danger"
                  component={Link}
                  to="/hospital-registration">
                  Hospital Join Free
                </Button>
              </div>
              <div className="space">
                <Button variant="solid" color="danger">
                  Hospital Login
                </Button>
              </div>
            </Box>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
