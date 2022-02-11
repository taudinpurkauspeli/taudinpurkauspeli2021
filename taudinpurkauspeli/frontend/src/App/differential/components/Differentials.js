/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DifferentialGroupList from './differentialGroup/DifferentialGroupList';
import NewDifferentialGroup from './differentialGroup/NewDifferentialGroup';

const Differentials = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div>
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <div>
          <NewDifferentialGroup caseId={id} />
        </div>
      )}
      <DifferentialGroupList admin={admin} />
    </div>
  );
};

export default Differentials;
