/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link, useParams,
} from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

const Case = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const baseUrl = `/cases/${id}`;

  return (

    <div id="wrapper">
      <ButtonGroup>
        <Button className="tabs" as={Link} to={baseUrl} disabled>{t('caseAnamnesis')}</Button>
        <Button className="tabs" as={Link} to={`${baseUrl}/procedures`}>{t('caseProcedures')}</Button>
        <Button className="tabs" as={Link} to={`${baseUrl}/differentials`}>{t('caseDifferentials')}</Button>
      </ButtonGroup>
    </div>

  );
};

export default Case;
