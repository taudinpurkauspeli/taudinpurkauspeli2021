import React from 'react';
import './App.css';

import Navigationbar from './components/Navbar';

const App = () => {
  const user = true;
  const admin = true;

  return (
    <Navigationbar user={user} admin={admin} />
  );
};

export default (App);
