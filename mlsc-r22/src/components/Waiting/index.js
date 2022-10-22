import * as React from "react";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Lottie from "lottie-react";
import Animation from "./assets/animation.json";
import Live from "./assets/live.json";

import bg from "./assets/bg.png";

import { Backdrop, Container } from "@mui/material";

import styles from "./waiting.module.css";
import { Link } from "react-router-dom";
import Waiting_Timer from "../Waiting_Timer";
import { Quiz } from "../Quiz/index";
import { useCookies } from "react-cookie";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  // padding: '0px',
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(0.5),
  borderRadius: "20px",
  textAlign: "center",
}));

const Waiting = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className={styles.wrapper}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Item
                sx={
                  {
                    //  width:'50vw',
                    // height: '97.22vh',
                    // background: 'rgba(255, 255, 255, .7)',
                  }
                }
              >
                <img
                  src={bg}
                  loading="lazy"
                  alt="bg_img"
                  className={styles.backImg}
                />
                <div className={styles.glass}>
                  <Waiting_Timer />
                </div>
              </Item>
            </Grid>

            <Grid
              sx={{
                width: "50vw",
                height: "100vh",
              }}
              item
              xs={6}
            >
              <Item
                sx={{
                  width: "48vw",
                  height: "97.22vh",
                }}
              >
                <Container maxWidth="sm">
                  <Lottie
                    animationData={Animation}
                    style={{
                      width: "20rem",
                      marginLeft: "20%",
                      position: "relative",
                    }}
                  />
                </Container>
                <h5
                  style={{
                    fontFamily: "Nunito",
                    color: "#fff",
                    letterSpacing: "8px",
                  }}
                >
                  ALL THE BEST
                </h5>

                <h1 className={styles.myText}>We Will Start Very Soon</h1>

                <br />
                <Button variant="contained" disabled>
                  Please wait, You will be redirected soon
                </Button>
              </Item>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </div>
      </ThemeProvider>
    </>
  );
};

export default Waiting;
