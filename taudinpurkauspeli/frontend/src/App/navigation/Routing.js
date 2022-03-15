import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Frontpage from '../frontpage/Frontpage';
import HowToPlay from '../instructions/HowToPlay';
import Profile from '../users/Profile';
import Users from '../users/Users';
import Case from '../case/components/Case';
import Procedure from '../procedure/components/Procedure';
import FileBank from '../files/FileBank';

const Routing = () => {
  const admin = useSelector((state) => state.admin);

  return (
    <Switch>
      <Route path="/howtoplay">
        <HowToPlay />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/users">
        {admin ? <Users /> : <Redirect to="/" />}
      </Route>
      <Route path="/cases/:id/procedure/:id">
        <Procedure admin={admin} />
      </Route>
      <Route path="/cases/:id">
        <Case admin={admin} />
      </Route>
      <Route path="/files">
        {admin ? <FileBank /> : <Redirect to="/" />}
      </Route>
      <Route path="/">
        <Frontpage admin={admin} />
      </Route>
    </Switch>
  );
};

export default Routing;
