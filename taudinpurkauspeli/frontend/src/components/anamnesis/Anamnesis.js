/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import HideCase from '../case/HideCase';
import service from '../../services/cases';
import UpdateCaseTitle from '../case/UpdateCaseTitle';
import { setSuccess, setError } from '../utils/MessageBanner';

const Anamnesis = ({ cases, admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));
  // currentcase was used to fix bug where case title and visibility
  // could not be updated at the same time
  // see https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/commit/24d648f4a684d2acd3d378196c3fc09e6836b1a6#diff-9f9374df7bc962cc29cb590ed33d6b81f84a09bbced9187d2fb750e2f7d645ee
  // temporarily modified to prevent refresh page bug
  // eslint-disable-next-line no-unused-vars
  const [currentCase, setCurrentCase] = useState(c);

  /* istanbul ignore next */
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
    <div id="wrapper">
      <p>Casen tiedot löytyvät täältä</p>
      { admin && c && (
        <div>
          <UpdateCaseTitle c={c} updateCaseTitle={handleCaseUpdate} />
          <HideCase c={c} hideCase={handleCaseUpdate} />
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
