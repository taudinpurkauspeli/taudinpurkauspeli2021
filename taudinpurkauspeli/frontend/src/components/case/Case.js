import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NewProcedure from './NewProcedure';
import serviceUnderCases from '../../services/proceduresUnderCase';

const Anamnesis = ({ c }) => (
  <div>
    <p>Casen tiedot löytyvät täältä</p>
    <h2>{c.title}</h2>
    <p>{c.anamnesis}</p>
  </div>
);

const Procedures = ({ id }) => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    serviceUnderCases
      .getAll(id)
      .then((procedureList) => {
        setProcedures(procedureList);
      });
  }, []);

  return (
    <div>
      <p>Toimenpiteet löytyvät täältä</p>
      <NewProcedure id={id} />
      <ul>
        {procedures.map((p) => <li>{p.procedureId}</li>)}
      </ul>
    </div>
  );
};

const Differentials = () => (
  <div>
    <p>Diffit löytyvät täältä</p>
  </div>
);

const Case = ({ cases }) => {
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
            <Procedures id={id} />
          </Route>
          <Route path={`${baseUrl}/differentials`}>
            <Differentials />
          </Route>
          <Route path={baseUrl}>
            <Anamnesis c={c} />
          </Route>
        </Switch>

      </div>

    </Router>
  );
};

export default Case;
