import React from "react";
import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";

const TimeOver = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Typography align="center" justifyContent="center" variant="h4">
          Time for the quiz is over.
        </Typography>
      </Container>
    </Box>
  );
};

export default TimeOver;
