import React, { useRef } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddUpdateModal from '../../../utils/AddUpdateModal';
import { updateDifferentialUnderCase, removeDifferentialUnderCase } from '../reducers/differentialsUnderCasesReducer';
import UpdateDifferentialForm from './UpdateDifferentialForm';

const Differential = ({
  d, admin,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* istanbul ignore next */
  const handleDifferentialUpdate = (updatedDifferential) => {
    modalRef.current.toggleVisibility();
    dispatch(updateDifferentialUnderCase({
      ...d,
      procedureId: updatedDifferential.procedureId,
      description: updatedDifferential.description,
    }, t('differentialUpdateSuccess'), t('differentialUpdateError')));
  };

  /* istanbul ignore next */
  const handleDifferentialRemove = (diffGroupCaseId, differentialId) => {
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t('deleteDifferentialUnderCaseConfirmation'));
    if (confirmBox === true) {
      dispatch(
        removeDifferentialUnderCase(
          diffGroupCaseId,
          differentialId,
          t('deleteDifferentialUnderCaseSuccess'),
          t('deleteDifferentialUnderCaseError'),
        ),
      );
    }
  };

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={d.id} id="differentialName">
        <div className="d-flex justify-content-between align-items-center">
          {d.name}
          {admin && (
          <div className="rows">
            <AddUpdateModal className="editButton" buttonLabel={t('buttonEdit')} titleLabel={t('updateSubProcedure')} ref={modalRef}>
              <UpdateDifferentialForm
                name={d.name}
                description={d.description}
                procedureId={d.procedureId}
                updateDifferential={handleDifferentialUpdate}
              />
            </AddUpdateModal>
            <Button className="removeButton" size="sm" variant="danger" onClick={() => handleDifferentialRemove(d.diffGroupCaseId, d.id)}>{t('buttonRemove')}</Button>
          </div>
          )}
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={d.id}>
        <Card.Body>{d.description}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Differential;
