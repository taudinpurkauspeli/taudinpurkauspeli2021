import React, { Image, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddDisease from "./components/add-disease.component";
import Disease from "./components/disease.component";
import DiseasesList from "./components/diseases-list.component";

// Import translations
import { useTranslation } from 'react-i18next';

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const Kokeilu = () => {
  return (
    <div>JEEEEE</div>
  )
}

const App = () => {
  const category = useField('text')
  const title = useField('text')
  const description = useField('text')
  const { t } = useTranslation

  const padding = {
    padding: 5
  }

    return (
    <Router>
      <div>
        <Link style={padding} to="/">Taudit</Link>
        <Link style={padding} to="/add">Lisää tauti</Link>
      </div>

      <Switch>
        <Route path="/add">
          <AddDisease category={category} title={title} description={description}/>
        </Route>
        <Route path="/">
          <Kokeilu />
        </Route>
      </Switch>

    </Router>
  )
}

export default (App);
