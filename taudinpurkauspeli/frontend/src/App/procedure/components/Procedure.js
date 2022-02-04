/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import NewTextSubProcedure from '../../subprocedure/components/textSubProcedure/NewTextSubProcedure';
import SubProcedureList from '../../subprocedure/components/SubProcedureList';
import { initializeSubprocedures } from '../../subprocedure/subProceduresReducer';

const Procedure = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const showWhenVisible = { display: show ? '' : 'none' };

  const handleVisibility = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(initializeSubprocedures(id));
  }, []);

  return (

    <div id="wrapper">
      <h2>
        {t('subProcedures')}
      </h2>
      {admin && (
        <div>
          <Button className="addButton" onClick={handleVisibility} id="addNew">
            {t('buttonNewSubProcedure')}
          </Button>
          <div className="rows" style={showWhenVisible}>
            <NewTextSubProcedure proceduresId={id} />
            <Button className="addButton question" size="sm">{t('buttonAddNewQuestion')}</Button>
            <Button className="addButton multichoice" size="sm">{t('buttonAddNewMultiChoice')}</Button>
            <Button className="addButton diagnosis" size="sm">{t('buttonAddFinalDiagnosis')}</Button>
          </div>
          <SubProcedureList admin={admin} />
        </div>
      )}
    </div>
  );
};

export default Procedure;
