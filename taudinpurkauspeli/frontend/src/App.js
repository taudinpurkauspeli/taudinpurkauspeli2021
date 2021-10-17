import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigationbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [guest, setGuest] = useState(true);

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

  return (
    <Navigationbar
      user={user}
      admin={admin}
      guest={guest}
      changeUser={changeUser}
      changeAdmin={changeAdmin}
      changeGuest={changeGuest}
    />
  );
};

export default (App);
