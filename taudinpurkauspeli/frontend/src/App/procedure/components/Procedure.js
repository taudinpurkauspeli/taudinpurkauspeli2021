import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import AddUpdateModal from '../../../utils/AddUpdateModal';
import SubProcedureList from '../../subprocedure/components/SubProcedureList';
import AddTextSubProcedure from '../../subprocedure/components/textSubProcedure/AddTextSubProcedure';
import { addSubprocedure } from '../../subprocedure/reducers/subProceduresReducer';
import { setSuccess, setError } from '../../../utils/MessageBanner';
import AddInterviewSubProcedure from '../../subprocedure/components/interviewSubProcedure/AddInterviewSubProcedure';

const Procedure = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const modalRef = useRef();

  const showWhenVisible = { display: show ? '' : 'none' };

  const handleVisibility = () => {
    setShow(!show);
  };

  /* istanbull ignore next */
  const handleSubProcedureAdd = (newSubProcedure) => {
    modalRef.current.toggleVisibility();
    try {
      dispatch(addSubprocedure(newSubProcedure, Number(id)));
      setSuccess(t('subProcedureUpdateSuccess'));
    } catch (error) {
      setError(t('subProcedureUpdateError'));
    }
  };

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
            <AddUpdateModal buttonLabel={t('buttonAddNewText')} titleLabel={t('addTextSubProcedure')} ref={modalRef}>
              <AddTextSubProcedure addSubProcedure={handleSubProcedureAdd} />
            </AddUpdateModal>
            <Button className="addButton question" size="sm">{t('buttonAddNewQuestion')}</Button>
            <AddUpdateModal buttonLabel={t('buttonAddNewInterview')} titleLabel={t('addInterviewSubProcedure')} ref={modalRef}>
              <AddInterviewSubProcedure addSubProcedure={handleSubProcedureAdd} />
            </AddUpdateModal>
            <Button className="addButton diagnosis" size="sm">{t('buttonAddFinalDiagnosis')}</Button>
          </div>
          <SubProcedureList procedureCaseId={id} admin={admin} />
        </div>
      )}
    </div>
  );
};

export default Procedure;
