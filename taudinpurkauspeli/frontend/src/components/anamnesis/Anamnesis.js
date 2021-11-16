import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-bootstrap';
import HideCase from '../case/HideCase';
import service from '../../services/cases';
import UpdateCaseTitle from '../case/UpdateCaseTitle';

const Anamnesis = ({ c, admin }) => {
  const { t } = useTranslation();

  const [alertMessage, setAlertMessage] = useState(null);

  const handleTitleUpdate = (updatedCase) => {
    service.update(c.id, updatedCase);
    setAlertMessage(t('caseUpdateSuccess'));
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <div>
      { alertMessage !== null && (
        <Alert variant="success">{alertMessage}</Alert>
      )}
      <p>Casen tiedot löytyvät täältä</p>
      { admin && (
        <div>
          <UpdateCaseTitle c={c} updateCaseTitle={handleTitleUpdate} />
          <HideCase caseToBeHidden={c} />
        </div>
      )}
      { !admin && (
        <p>{c.title}</p>
      )}
      <p>{c.anamnesis}</p>
    </div>
  );
};

export default Anamnesis;
