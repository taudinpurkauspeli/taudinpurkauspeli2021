import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import DifferentialGroupList from './differentialGroup/DifferentialGroupList';
import AddUpdateModal from '../../../utils/AddUpdateModal';
import AddDifferentialGroupForm from './differentialGroup/AddDifferentialGroupForm';
import { createDifferentialGroup } from '../reducers/differentialGroupsReducer';

const Differentials = ({ admin }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();
  const { id } = useParams();

  /* istanbul ignore next */
  const handleDifferentialGroupAdd = (differentialGroupObject) => {
    modalRef.current.toggleVisibility();
    dispatch(createDifferentialGroup(Number(id), differentialGroupObject, t('differentialGroupUpdateSuccess'), t('differentialGroupUpdateError')));
  };

  return (
    <div>
      <h2>
        {t('Differentials')}
      </h2>
      {admin && (
        <AddUpdateModal buttonLabel={t('buttonNewDifferentialGroup')} titleLabel={t('addDifferentialGroup')} ref={modalRef}>
          <AddDifferentialGroupForm addDifferentialGroup={handleDifferentialGroupAdd} />
        </AddUpdateModal>
      )}
      <DifferentialGroupList admin={admin} />
    </div>
  );
};

export default Differentials;
