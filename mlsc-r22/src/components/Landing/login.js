import React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import "./landing.css";
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
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
const Login = () => {
  return (
    <div className="glass">
    <CssVarsProvider>
      <main>
        {/* <ModeToggle /> */}
        <Sheet
          sx={{
            width: 350,
            mx: "auto", // margin left & right
            my: 2, // margin top & botom
            py: 3, // padding top & bottom
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
              <b>Welcome!</b>
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
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            // pass down to FormLabel as children
            label="Email"
          />
          <Button sx={{ mt: 1 /* margin top */ }}>Submit</Button>
        </Sheet>
      </main>
    </CssVarsProvider>
    </div>
  );
};

export default Login;
