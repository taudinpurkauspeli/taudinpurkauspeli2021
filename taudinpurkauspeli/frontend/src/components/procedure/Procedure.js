/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
/* import SubProcedureList from '../subprocedure/SubProcedureList'; */
import NewTextSubProcedure from '../subprocedure/NewTextSubProcedure';
import SubProcedureList from '../subprocedure/SubProcedureList';

// eslint-disable-next-line no-unused-vars
const Procedure = ({ admin, caseId }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [show, setShow] = useState(false);

  /* const hideWhenVisible = { display: show ? 'none' : '' }; */
  const showWhenVisible = { display: show ? '' : 'none' };

  return (

    <div id="wrapper">
      <h2>
        {t('subProcedures')}
      </h2>
      {admin && (
        <div>
          <Button variant="primary" onClick={() => setShow(true)} id="addNew">
            {t('buttonNewSubProcedure')}
          </Button>
          <div style={showWhenVisible}>
            <NewTextSubProcedure proceduresId={id} />
            <Button variant="primary" className="editButton" size="sm">{t('buttonAddNewQuestion')}</Button>
            <Button variant="primary" className="editButton" size="sm">{t('buttonAddNewMultiChoice')}</Button>
            <Button variant="primary" className="editButton" size="sm">{t('buttonAddFinalDiagnosis')}</Button>
          </div>
          <SubProcedureList proceduresId={id} admin={admin} />
        </div>
      )}
    </div>
  );
};

export default Procedure;
