import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  return (
    <>
    <Header />
      <div className="container">
        <Router>
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
