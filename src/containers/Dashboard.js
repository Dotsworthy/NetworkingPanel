import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import NetworkContainer from "./NetworkContainer";
import { CssBaseline } from "@material-ui/core";

export default function Dashboard() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    }
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <div> Network Dashboard </div>
      <Switch checked={darkState} onChange={handleThemeChange} />
      <NetworkContainer/>
    </ThemeProvider>
  );
}