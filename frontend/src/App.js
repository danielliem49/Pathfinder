
import { Route, Switch } from "react-router-dom";
import Splash from "./components/Splash";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import TrailShow from "./components/TrailShow";
import ParkShow from "./components/ParkShow";
import Footer from "./components/Footer";
import IncompleteModal from "./components/IncompleteModal/IncompleteModal";
import AboutModal from "./components/AboutModal/AboutModal";
import { useState } from "react";
import React from "react";

export const AboutModalContext = React.createContext();
export const IncompleteModalContext = React.createContext();

function App() {

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);

  return (
    <>
      <IncompleteModalContext.Provider value={{ showIncompleteModal, setShowIncompleteModal }}>
        <AboutModalContext.Provider value={{ showAboutModal, setShowAboutModal }}>

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

          <IncompleteModal />
          <AboutModal />


          <Footer />
        </AboutModalContext.Provider>
      </IncompleteModalContext.Provider>

    </>
  );
}

export default App;