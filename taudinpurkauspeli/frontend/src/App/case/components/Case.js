/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link, useParams, Switch, Route, Redirect,
} from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Procedures from '../../procedure/components/Procedures';
import Differentials from '../../differential/Differentials';
import Anamnesis from '../../anamnesis/Anamnesis';
import { getProceduresUnderCase } from '../../procedure/proceduresReducer';

const Case = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const baseUrl = `/cases/${id}`;

  useEffect(() => {
    dispatch(getProceduresUnderCase(id));
  }, []);

  const buttonGroupStyle = {
    marginBottom: 25,
  };

  return (
    <div id="wrapper">
      <ButtonGroup style={buttonGroupStyle}>
        <Button className="tabs" as={Link} to={`${baseUrl}/anamnesis`} disabled>{t('caseAnamnesis')}</Button>
        <Button className="tabs" as={Link} to={`${baseUrl}/procedures`}>{t('caseProcedures')}</Button>
        <Button className="tabs" as={Link} to={`${baseUrl}/differentials`}>{t('caseDifferentials')}</Button>
      </ButtonGroup>

      <Switch>
        <Route path="/cases/:id/anamnesis">
          <Anamnesis admin={admin} />
        </Route>
        <Route path="/cases/:id/procedures">
          <Procedures admin={admin} />
        </Route>
        <Route path="/cases/:id/differentials">
          <Differentials admin={admin} />
        </Route>
        <Route path="/cases/:id">
          <Redirect to={`${baseUrl}/anamnesis`} />
        </Route>
      </Switch>
    </div>
  );
};

export default Case;
