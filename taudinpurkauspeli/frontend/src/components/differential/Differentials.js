/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewDifferential from './NewDifferential';
import DifferentialList from './DifferentialList';

const Differentials = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div id="wrapper">
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <div>
          <NewDifferential caseId={id} />
        </div>
      )}
      <DifferentialList caseId={id} />
    </div>
  );
};

export default Differentials;
