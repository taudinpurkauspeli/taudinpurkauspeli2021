/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
import NewSubProcedure from './NewSubProcedure';
import SubProcedureList from './SubProcedureList';

const SubProcedures = ({ admin, procedureId }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>
        {t('SubProcedures')}
      </h2>
      {admin && (
        <div>
          <NewSubProcedure procedureId={procedureId} />
        </div>
      )}
      <SubProcedureList procedureId={procedureId} />
    </div>
  );
};

export default SubProcedures;
