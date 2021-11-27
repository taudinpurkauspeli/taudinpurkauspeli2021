/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Differentials from '../differential/Differentials';
import Anamnesis from '../anamnesis/Anamnesis';
import Procedures from '../procedure/Procedures';

const Case = ({ cases, admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));
  const baseUrl = `/cases/${id}`;

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
            <Differentials admin={admin} caseId={id} />
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
