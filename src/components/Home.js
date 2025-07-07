import React from "react";
import { Box, Button, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        px: 2,
        py: 4,
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        align="center"
        gutterBottom
      >
        Welcome to Sejuk Sejuk Service Sdn Bhd
      </Typography>
      <Typography
        variant={isMobile ? "body1" : "h6"}
        align="center"
        gutterBottom
      >
        Select your role to continue:
      </Typography>

      <Stack
        spacing={2}
        direction={isMobile ? "column" : "row"}
        sx={{ width: isMobile ? "100%" : "auto", mt: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth={isMobile}
          onClick={() => navigate("/admin")}
        >
          Admin
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth={isMobile}
          onClick={() => navigate("/technician")}
        >
          Technician
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
