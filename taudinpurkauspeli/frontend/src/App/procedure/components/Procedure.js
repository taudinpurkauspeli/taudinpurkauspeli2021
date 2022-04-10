import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import AddUpdateModal from '../../../utils/AddUpdateModal';
import SubProcedureList from '../../subprocedure/components/SubProcedureList';
import AddTextSubProcedure from '../../subprocedure/components/textSubProcedure/AddTextSubProcedure';
import { addSubprocedure } from '../../subprocedure/reducers/subProceduresReducer';
import AddInterviewSubProcedure from '../../subprocedure/components/interviewSubProcedure/AddInterviewSubProcedure';
import AddConclusionSubProcedureForm from '../../subprocedure/components/conclusionSubProcedure/AddConclusionSubProcedureForm';

const Procedure = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const modalRef = useRef();

  const caseSubProcedures = useSelector((state) => state.subProcedures);
  const listedProcedures = caseSubProcedures
    .filter((p) => p.procedureCaseId === Number(id))
    .sort((a, b) => a.priority - b.priority);

  const showWhenVisible = { display: show ? '' : 'none' };

  const handleVisibility = () => {
    setShow(!show);
  };

  /* istanbull ignore next */
  const handleSubProcedureAdd = (newSubProcedure) => {
    modalRef.current.toggleVisibility();
    dispatch(addSubprocedure(newSubProcedure, Number(id), t('subProcedureAddSuccess'), t('subProcedureAddError')));
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
            <AddUpdateModal disabled={caseSubProcedures.some((p) => p.type === 'CONCLUSION')} buttonLabel={t('buttonAddFinalDiagnosis')} titleLabel={t('addConclusionSubProcedure')} ref={modalRef}>
              <AddConclusionSubProcedureForm addSubProcedure={handleSubProcedureAdd} />
            </AddUpdateModal>
          </div>
          <SubProcedureList listedProcedures={listedProcedures} admin={admin} />
        </div>
      )}
    </div>
  );
};

export default Procedure;
