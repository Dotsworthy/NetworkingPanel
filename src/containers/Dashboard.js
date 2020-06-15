import React, { useState } from "react";
import { CssBaseline, Switch, AppBar, Container, FormControlLabel, Toolbar, Grid, Typography } from "@material-ui/core";
import {blue, grey, } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";

import NetworkContainer from "./NetworkContainer";

const useStyles = makeStyles(theme => ({
  appBar: {
      boxShadow: 'none',
      background: 'none',
  },
  title: {
    background: 'linear-gradient(to right, red, purple)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

export default function Dashboard() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? blue[900] : grey[300];
  const mainSecondaryColor = darkState ? '#FF1053' : '#FF1053';
  const darkTheme = createMuiTheme({
    palette: {
        type: palletType,
        primary: {
          main: mainPrimaryColor
        },
        secondary: {
          main: mainSecondaryColor
        },
     },
     typography: {
       fontFamily: 'nunito',
     },
    });
  const classes = useStyles();
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container>
        <AppBar
            position="static"
            className={classes.appBar}
        >
        <Toolbar>
        <Grid
        container
        justify="space-between"
        >
          <Typography
            variant="h3"
            color="inherit"
            className={classes.title}
          >
            dashNET
          </Typography>
          <FormControlLabel
          control={
              <Switch 
                  checked={darkState}
                  onChange={handleThemeChange}
              />
          }
          label="Dark"
          />
        </Grid>
        </Toolbar>
        </AppBar>
      </Container>
      <Container>
          <NetworkContainer
          darkState = {darkState}
          />
      </Container>
    </ThemeProvider>
  );
}