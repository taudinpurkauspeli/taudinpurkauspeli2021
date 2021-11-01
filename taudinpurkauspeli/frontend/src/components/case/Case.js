import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Editable from 'react-editable-title';
import service from '../../services/cases';

const Anamnesis = ({ c, admin }) => {
  const [title, setTitle] = useState(c.title);

  const handleTitleUpdate = (current) => {
    const updatedCase = {
      title: current,
      anamnesis: c.anamnesis,
      hidden: c.hidden,
    };
    service.update(c.id, updatedCase);
    setTitle(current);
  };

  return (
    <div>
      <p>Casen tiedot löytyvät täältä</p>
      { admin && (
        <Editable
          text={title}
          editButton
          editControls
          placeholder="Type here"
          cb={handleTitleUpdate}
        />
      )}
      { !admin && (
        <p>{c.title}</p>
      )}
      <p>{c.anamnesis}</p>
    </div>
  );
};

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
