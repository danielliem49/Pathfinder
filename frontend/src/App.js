
import React from "react";
import { Route, Switch } from "react-router-dom";
import Splash from "./components/Splash";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import TrailShow from "./components/TrailShow";
import ParkShow from "./components/ParkShow";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/trails/:trailId">
          <TrailShow />
        </Route>
        <Route path="/parks/:parkId">
          <ParkShow />
        </Route>

        {/* <Route path="/:userId">
          <Splash />
        </Route> */}

        <Route path="/">
          <Splash />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;