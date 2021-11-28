/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

// Import components
import Navigationbar from './components/navigation/Navbar';
import service from './services/cases';
import Sidebar from './components/navigation/Sidebar';
import Routing from './components/navigation/Routing';

const App = () => {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [guest, setGuest] = useState(true);
  const [cases, setCases] = useState([]);

  const changeUser = () => {
    setUser(true);
    setGuest(false);
    setAdmin(false);
  };

  const changeGuest = () => {
    setUser(false);
    setGuest(true);
    setAdmin(false);
  };

  const changeAdmin = () => {
    setUser(false);
    setGuest(false);
    setAdmin(true);
  };

  React.useEffect(() => {
    service
      .getAll()
      .then((initialCases) => {
        setCases(initialCases);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Navigationbar
        user={user}
        admin={admin}
        guest={guest}
        changeUser={changeUser}
        changeAdmin={changeAdmin}
        changeGuest={changeGuest}
        cases={cases}
      />
      { guest ? ' ' : <Sidebar /> }
      <Routing cases={cases} admin={admin} guest={guest} />
    </Router>
  );
};

export default (App);
