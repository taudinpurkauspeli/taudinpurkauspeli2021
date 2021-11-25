/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import NewSubProcedure from '../subprocedure/NewSubProcedure';
/* import SubProcedureList from '../subprocedure/SubProcedureList'; */

const Procedure = ({ admin }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  // eslint-disable-next-line no-console
  console.log(admin);

  return (

    <div>
      <h2>
        {t('subProcedures')}
      </h2>
      {admin && (
        <div>
          <NewSubProcedure />
        </div>
      )}
    </div>
  );
};

export default Procedure;
