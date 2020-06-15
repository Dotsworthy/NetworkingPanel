import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import NetworkContainer from "./NetworkContainer";
import { CssBaseline } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from "@material-ui/core/Grid";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
    blue,
    grey,
  } from "@material-ui/core/colors";

const drawerWidth = 240;

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
        <CssBaseline />
        <Container>
    <AppBar
        position="static"
        className={classes.appBar}
    >
        <Toolbar>
        <Grid
        container
        justify="space-between">
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