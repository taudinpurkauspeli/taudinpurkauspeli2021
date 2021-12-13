/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import NewProcedure from './NewProcedure';
import ProcedureList from './ProcedureList';

const Procedures = ({ admin }) => {
  /* istanbul ignore next */
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div id="wrapper">
      <h2>{t('procedures')}</h2>
      { admin && (
        <NewProcedure caseId={id} />
      )}
      <ProcedureList id={id} />
    </div>
  );
};

export default Procedures;
