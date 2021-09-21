import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Footer from "./components/footer";
import Header from "./components/header";
import CityDetails from "./components/city-details";
import LocationDetails from "./components/location-details";
import UpdateCity from "./components/city-update";
import UpdateLocation from "./components/updateLocation";
import CreateCity from "./components/create-city";
import CreateLocation from "./components/createLocation";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/city/create">
                <CreateCity />
              </Route>
              <Route exct path="/city/:cityId/details">
                <CityDetails />
              </Route>
              <Route exct path="/city/:cityId/update">
                <UpdateCity />
              </Route>
              <Route exct path="/location/create">
                <CreateLocation />
              </Route>
              <Route exct path="/location/:locationId/details">
                <LocationDetails />
              </Route>
              <Route exct path="/location/:locationId/update">
                <UpdateLocation />
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;
