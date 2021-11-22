/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HideCase from '../case/HideCase';
import service from '../../services/cases';
import UpdateCaseTitle from '../case/UpdateCaseTitle';

const Anamnesis = ({ cases, admin }) => {
  const { t } = useTranslation();
  const [alertMessage, setAlertMessage] = useState(null);

  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));

  const handleTitleUpdate = (updatedCase) => {
    service.update(c.id, updatedCase);
    setAlertMessage(t('caseUpdateSuccess'));
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <div id="wrapper">
      { alertMessage !== null && (
        <Alert variant="success">{alertMessage}</Alert>
      )}
      <p>Casen tiedot löytyvät täältä</p>
      { admin && c && (
        <div>
          <UpdateCaseTitle c={c} updateCaseTitle={handleTitleUpdate} />
          <HideCase caseToBeHidden={c} />
        </div>
      )}
      { !admin && c && (
        <p>{c.title}</p>
      )}
      { c && (
        <p>{c.anamnesis}</p>
      )}
    </div>
  );
};

export default Anamnesis;
