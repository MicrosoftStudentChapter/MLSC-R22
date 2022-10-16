import React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
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
  if (cookies.user) {
    window.location.href = "/waiting";
  }
  const [email, setEmail] = React.useState("");
  const submitHandler = async () => {
    try {
      const bodyData = new URLSearchParams();
      console.log(email);
      bodyData.append("email", email);
      const res = await fetch(
        "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/verify/1",
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
        setCookie("user", data.data, {
          path: "/",
          expires: new Date("16 October 2022 12:25:00 PM"),
        });
        window.location.href = "/waiting";
      } else {
        console.log("invalid");
        return;
      }
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
              mx: "auto",
              my: 2,
              py: 3,
              px: 3,
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
                Enter you name and email id to continue.
              </Typography>
            </div>
            <TextField
              name="FullName"
              type="text"
              placeholder="Full Name"
              label="Full Name"
            />
            <TextField
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button button sx={{ mt: 1 }} onClick={submitHandler}>
              Submit
            </Button>
          </Sheet>
        </main>
      </CssVarsProvider>
    </div>
  );
};

export default Login;
