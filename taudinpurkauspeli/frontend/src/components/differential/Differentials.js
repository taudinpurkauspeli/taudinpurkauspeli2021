/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
// import NewDifferential from './NewDifferential';
import DifferentialGroupList from './differentialGroup/DifferentialGroupList';
import NewDifferentialGroup from './differentialGroup/NewDifferentialGroup';

const Differentials = ({ admin, caseId }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <div>
          <NewDifferentialGroup caseId={caseId} />
        </div>
      )}
      <DifferentialGroupList caseId={caseId} admin={admin} />
    </div>
  );
};

export default Differentials;
