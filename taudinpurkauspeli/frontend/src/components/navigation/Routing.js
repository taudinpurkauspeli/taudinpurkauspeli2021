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
import Procedures from '../procedure/Procedures';
import Procedure from '../procedure/Procedure';
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
      <Procedures admin={admin} />
    </Route>
    <Route path="/cases/:id/procedure/:id">
      <Procedure admin={admin} />
    </Route>
    <Route path="/cases/:id/differentials">
      <Case cases={cases} admin={admin} />
      <Differentials admin={admin} />
    </Route>
    <Route path="/cases/:id">
      <Case cases={cases} admin={admin} />
      <Anamnesis cases={cases} admin={admin} />
    </Route>
    <Route path="/">
      <Frontpage admin={admin} cases={cases} />
    </Route>
  </Switch>
);

export default Routing;
