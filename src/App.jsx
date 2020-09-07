import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { ModuleRegistry, AllModules } from "@ag-grid-enterprise/all-modules";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./App.scss";
import { userNamesArchive } from "./mock/usernames-archive";
import { GeneralGrid, SurveyGrid } from "./components";

ModuleRegistry.registerModules(AllModules);

const loadData = () => {
  const URL = "http://localhost:6000/usernames";
  const otherParams = {
    body: JSON.stringify(userNamesArchive),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(URL, otherParams)
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
    })
    .catch(console.log);
};

const App = () => {
  return (
    <Router>
      <Helmet>
        <title>Data archive</title>
      </Helmet>
      <div>
        <div className="header">
          <ul className="menu">
            <li>
              <Link to="/">General grid</Link>
            </li>
            <li>
              <Link to="/survey">Survey grid</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/">
            <GeneralGrid />
          </Route>
          <Route path="/survey">
            <SurveyGrid />
          </Route>
        </Switch>
        <button onClick={loadData} className="button-load">
          Load data to archive
        </button>
      </div>
    </Router>
  );
};

export default App;
