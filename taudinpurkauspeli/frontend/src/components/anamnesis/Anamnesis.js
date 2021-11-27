/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HideCase from '../case/HideCase';
import service from '../../services/cases';
import UpdateCaseTitle from '../case/UpdateCaseTitle';
import { setSuccess, setError } from '../utils/MessageBanner';

const Anamnesis = ({ c, admin }) => {
  const { t } = useTranslation();
  const [currentCase, setCurrentCase] = useState(c);

  const handleCaseUpdate = (updatedCase) => {
    service.update(c.id, updatedCase)
      .then(() => {
        setCurrentCase(updatedCase);
        setSuccess(t('caseUpdateSuccess'));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setError(t('caseUpdateError'));
      });
  };

  return (
    <div>
      <p>Casen tiedot löytyvät täältä</p>
      { admin && (
        <div>
          <UpdateCaseTitle c={currentCase} updateCaseTitle={handleCaseUpdate} />
          <HideCase c={currentCase} hideCase={handleCaseUpdate} />
        </div>
      )}
      { !admin && (
        <p>{currentCase.title}</p>
      )}
      <p>{currentCase.anamnesis}</p>
    </div>
  );
};

export default Anamnesis;
