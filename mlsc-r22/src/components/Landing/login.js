import React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import { Alert, CircularProgress } from "@mui/joy";
import { Snackbar } from "@mui/material";
import "./landing.css";
import { useCookies } from "react-cookie";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "dark" ? "light" : "dark");
      }}
    >
      {mode === "dark" ? "Turn light" : "Turn dark"}
    </Button>
  );
}

const Login = (props) => {
  const [cookies, setCookie] = useCookies(["session"]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (cookies.user) {
    window.location.href = "/waiting";
  }
  const [email, setEmail] = React.useState("");
  const submitHandler = async () => {
    try {
      const bodyData = new URLSearchParams();
      console.log(email);
      bodyData.append("email", email);
      setLoading(true);
      const res = await fetch(
        "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/verify/online",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyData,
          redirect: "follow",
        }
      );
      const data = await res.json();
      if (data.status) {
        setCookie("user", data.email, {
          path: "/",
          expires: new Date("20 October 2022 11:15:00 PM"), //End Time
        });
        window.location.href = "/waiting";
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
        console.log("invalid");
      }
      setLoading(false);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="glass">
      <CssVarsProvider>
        <main>
          <Sheet
            sx={{
              width: 350,
              mx: "auto", // margin left & right
              my: 2, // margin top & botom
              py: 1, // padding top & bottom
              px: 3, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
            }}
            variant="outlined"
          >
            <div>
              <Typography level="h4" component="h1">
                Welcome!
              </Typography>
              <Typography level="body2">
                Enter your email id to continue.
              </Typography>
            </div>
            <TextField
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button button sx={{ mt: 1 }} onClick={submitHandler}>
              {loading ? (
                <CircularProgress color="info" variant="plain" />
              ) : (
                "Submit"
              )}
            </Button>
          </Sheet>
        </main>
      </CssVarsProvider>
      {error ? (
        <Snackbar open={error}>
          <Alert variant="soft" color="danger" size="lg">
            Invalid Email
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default Login;
