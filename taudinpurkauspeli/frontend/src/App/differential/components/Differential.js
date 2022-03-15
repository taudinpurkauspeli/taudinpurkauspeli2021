/* eslint-disable linebreak-style */
import React, { useRef } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddUpdateModal from '../../../utils/AddUpdateModal';
import { setError, setSuccess } from '../../../utils/MessageBanner';
import { updateDifferentialUnderCase } from '../reducers/differentialsUnderCasesReducer';
import UpdateDifferentialForm from './UpdateDifferentialForm';

const Differential = ({
  d, admin,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();

  const handleDifferentialUpdate = (updatedDifferential) => {
    modalRef.current.toggleVisibility();
    try {
      dispatch(updateDifferentialUnderCase({
        ...d,
        description: updatedDifferential.description,
      }));
      setSuccess(t('differentialUpdateSuccess'));
    } catch {
      setError('differentialUpdateError');
    }
  };

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={d.id} id="differentialName">
        <div className="d-flex justify-content-between align-items-center">
          {d.name}
          {admin && (
          <div className="cardButtons">
            <AddUpdateModal className="editButton" buttonLabel={t('buttonEdit')} titleLabel={t('updateSubProcedure')} ref={modalRef}>
              <UpdateDifferentialForm
                name={d.name}
                description={d.description}
                updateDifferential={handleDifferentialUpdate}
              />
            </AddUpdateModal>
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
