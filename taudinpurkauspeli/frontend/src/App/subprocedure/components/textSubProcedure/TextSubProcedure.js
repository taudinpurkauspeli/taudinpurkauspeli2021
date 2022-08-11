import React, { useRef } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import UpdateTextSubProcedureForm from './UpdateTextSubProcedureForm';
import { updateSubprocedure } from '../../reducers/subProceduresReducer';
import { setSuccess, setError } from '../../../../utils/MessageBanner';
import AddUpdateModal from '../../../../utils/AddUpdateModal';

const TextSubProcedure = ({ d, admin }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef();

  /* istanbul ignore next */
  const handleTextSubProcedureUpdate = (updatedObject) => {
    modalRef.current.toggleVisibility();
    try {
      dispatch(updateSubprocedure(d.id, {
        ...d,
        text: updatedObject.text,
      }));
      setSuccess(t('subProcedureUpdateSuccess'));
    } catch (error) {
      setError(t('subProcedureUpdateError'));
    }
  };

  return (
    <div>
      <Card style={{ width: '60rem' }}>
        <Accordion.Toggle as={Card.Header} eventKey={d.id}>
          <div className="d-flex justify-content-between align-items-center">
            {d.name}
            {admin && (
            <div className="cardButtons">
              <AddUpdateModal className="editButton" buttonLabel={t('buttonEdit')} titleLabel={t('updateSubProcedure')} ref={modalRef}>
                <UpdateTextSubProcedureForm
                  name={d.name}
                  text={d.text}
                  updateTextSubProcedure={handleTextSubProcedureUpdate}
                />
              </AddUpdateModal>
            </div>
            )}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={d.id}>
          <Card.Body>{d.text}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
};

export default TextSubProcedure;
