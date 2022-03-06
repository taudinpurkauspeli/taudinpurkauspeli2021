import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NewProcedureForm from './NewProcedureForm';
import ProcedureList from './ProcedureList';
import AddUpdateModal from '../../../utils/AddUpdateModal';
import { createProcedure } from '../reducers/proceduresReducer';
import { setSuccess, setError } from '../../../utils/MessageBanner';

const Procedures = ({ admin }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* istanbul ignore next */
  const handleProcedureAdd = (procedureObject) => {
    modalRef.current.toggleVisibility();
    try {
      dispatch(createProcedure(Number(id), procedureObject));
      setSuccess(t('procedureAddSuccess'));
    } catch (error) {
      setError(t('procedureAddError'));
    }
  };

  return (
    <div>
      <h2>{t('procedures')}</h2>
      { admin && (
        <AddUpdateModal buttonLabel={t('buttonNewProcedure')} titleLabel={t('addProcedure')} ref={modalRef}>
          <NewProcedureForm addProcedure={handleProcedureAdd} />
        </AddUpdateModal>
      )}
      <ProcedureList id={id} />
    </div>
  );
};

export default Procedures;
