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
import MessageBanner from './components/utils/MessageBanner';

const App = () => {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cases, setCases] = useState([]);

  /* istanbul ignore next */
  React.useEffect(() => {
    service
      .getAll()
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.headers);
        setAdmin(response.headers.affiliation === 'faculty');
        setUser(!admin);
        setCases(response.data);
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
        cases={cases}
      />
      <Sidebar />
      <MessageBanner />
      <Routing cases={cases} admin={admin} />
    </Router>
  );
};

export default (App);
