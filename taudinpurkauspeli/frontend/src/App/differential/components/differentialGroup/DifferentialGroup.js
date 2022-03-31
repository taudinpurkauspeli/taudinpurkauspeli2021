import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import DifferentialList from '../DifferentialList';
import AddDifferentialForm from '../AddDifferentialForm';
import AddUpdateModal from '../../../../utils/AddUpdateModal';
import { createDifferential } from '../../reducers/differentialsReducer';

const DifferentialGroup = ({
  diffGroupCaseId, name, admin,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* istanbul ignore next */
  const handleDifferentialAdd = (differentialObject) => {
    modalRef.current.toggleVisibility();
    dispatch(createDifferential(diffGroupCaseId, differentialObject, t('differentialAddSuccess'), t('differentialAddError')));
  };

  return (
    <Card style={{ width: '60rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <DifferentialList diffGroupCaseId={diffGroupCaseId} admin={admin} />
        {admin && (
          <AddUpdateModal buttonLabel={t('buttonNewDifferential')} titleLabel={t('addDifferential')} ref={modalRef}>
            <AddDifferentialForm addDifferential={handleDifferentialAdd} />
          </AddUpdateModal>
        )}
      </Card.Body>
    </Card>
  );
};

export default DifferentialGroup;
