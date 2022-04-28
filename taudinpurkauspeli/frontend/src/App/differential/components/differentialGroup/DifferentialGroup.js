import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'react-bootstrap';
import DifferentialList from '../DifferentialList';
import AddDifferentialForm from '../AddDifferentialForm';
import AddUpdateModal from '../../../../utils/AddUpdateModal';
import { createDifferential } from '../../reducers/differentialsReducer';
import { removeDifferentialGroupUnderCase } from '../../reducers/differentialGroupsUnderCasesReducer';

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

  /* istanbul ignore next */
  const handleDifferentialGroupRemove = () => {
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t('deleteDifferentialGroupUnderCaseConfirmation'));
    if (confirmBox === true) {
      dispatch(
        removeDifferentialGroupUnderCase(
          diffGroupCaseId,
          t('deleteDifferentialGroupUnderCaseSuccess'),
          t('deleteDifferentialGroupUnderCaseError'),
        ),
      );
    }
  };

  return (
    <Card style={{ width: '60rem' }}>
      <Card.Header>
        {name}
        {admin && (
          <Button className="removeButton" size="sm" variant="danger" onClick={() => handleDifferentialGroupRemove()}>{t('buttonRemove')}</Button>
        )}
      </Card.Header>
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
