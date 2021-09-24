import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDisease from "./components/add-disease.component";
import Disease from "./components/disease.component";
import DiseasesList from "./components/diseases-list.component";

// Import translations
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation


    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/diseases" className="navbar-brand">
            Taudinpurkauspeli
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/diseases"} className="nav-link">
                Taudit
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Lisää tauti
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/add" component ={AddDisease} />
            <Route exact path={["/", "/diseases"]} component = {DiseasesList} />
            <Route path="/diseases/:id" component = {Disease} />
          </Switch>
        </div>
    </div>
  )
}

export default (App);
