/* eslint-disable array-callback-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
import NewDifferential from './NewDifferential';
import DifferentialList from './DifferentialList';

const Differentials = ({ admin, caseId }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <div>
          <NewDifferential caseId={caseId} />
        </div>
      )}
      <DifferentialList caseId={caseId} />
    </div>
  );
};

export default Differentials;
