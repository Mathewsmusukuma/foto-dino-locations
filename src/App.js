import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Cities from "./components/cities";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            <Cities />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
