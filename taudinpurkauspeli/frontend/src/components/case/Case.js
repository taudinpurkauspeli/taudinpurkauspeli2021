import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
// eslint-disable-next-line import/no-named-as-default
import HideCase from './HideCase';

const Anamnesis = ({ c, admin }) => (
  <div>
    <p>Casen tiedot löytyvät täältä</p>
    <h2>{c.title}</h2>
    {admin && (
      <HideCase caseToBeHidden={c} />
    )}
    <p>{c.anamnesis}</p>
  </div>
);

const Procedures = () => (
  <div>
    <p>Toimenpiteet löytyvät täältä</p>
  </div>
);

const Differentials = () => (
  <div>
    <p>Diffit löytyvät täältä</p>
  </div>
);

const Case = ({ cases, admin }) => {
  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));
  const baseUrl = `/cases/${id}`;
  const { t } = useTranslation();

  return (
    <Router>
      <div id="wrapper">
        <Button as={Link} to={baseUrl}>{t('caseAnamnesis')}</Button>
        <Button as={Link} to={`${baseUrl}/procedures`}>{t('caseProcedures')}</Button>
        <Button as={Link} to={`${baseUrl}/differentials`}>{t('caseDifferentials')}</Button>

        <Switch>
          <Route path={`${baseUrl}/procedures`}>
            <Procedures />
          </Route>
          <Route path={`${baseUrl}/differentials`}>
            <Differentials />
          </Route>
          <Route path={baseUrl}>
            <Anamnesis c={c} admin={admin} />
          </Route>
        </Switch>

      </div>

    </Router>
  );
};

export default Case;
