/* eslint-disable linebreak-style */
import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

// Import components
import Frontpage from '../frontpage/Frontpage';
import HowToPlay from '../instructions/HowToPlay';
import Profile from '../user/Profile';
import Case from '../case/Case';
import HideCase from '../case/HideCase';
import NewCase from '../case/NewCase';
import Procedures from '../procedure/Procedures';
import Differentials from '../differential/Differentials';
import Anamnesis from '../anamnesis/Anamnesis';

const Routing = ({ admin, cases }) => (
  <Switch>
    <Route path="/howtoplay">
      <HowToPlay />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/cases/:id/procedures">
      <Case cases={cases} admin={admin} />
      <Procedures />
    </Route>
    <Route path="/cases/:id/differentials">
      <Case cases={cases} admin={admin} />
      <Differentials admin={admin} />
    </Route>
    <Route path="/cases/:id">
      <Case cases={cases} admin={admin} />
      <Anamnesis cases={cases} admin={admin} />
    </Route>
    {admin && (
      <Route path="/editcase/:id">
        <HideCase cases={cases} />
      </Route>
    )}
    {admin && (
      <Route path="/newcase">
        <NewCase />
      </Route>
    )}
    <Route path="/">
      <Frontpage admin={admin} cases={cases} />
    </Route>
  </Switch>
);

export default Routing;
