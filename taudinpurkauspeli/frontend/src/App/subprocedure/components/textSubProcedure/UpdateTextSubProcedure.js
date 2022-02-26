import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import UpdateTextSubProcedureForm from './UpdateTextSubProcedureForm';
import { updateSubprocedure } from '../../reducers/subProceduresReducer';
import { setSuccess, setError } from '../../../../utils/MessageBanner';

const UpdateTextSubProcedure = ({ d }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleTextSubProcedureUpdate = (updatedObject) => {
    toggleVisibility();
    try {
      dispatch(updateSubprocedure(d.id, {
        ...d,
        title: updatedObject.title,
        text: updatedObject.text,
      }));
      setSuccess(t('subProcedureUpdateSuccess'));
    } catch (error) {
      setError(t('subProcedureUpdateError'));
    }
  };

  return (
    <div>
      <Button className="editButton" size="sm" onClick={toggleVisibility}>
        {t('buttonEdit')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('updateSubProcedure')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateTextSubProcedureForm
            title={d.title}
            text={d.text}
            handleTextSubProcedureUpdate={handleTextSubProcedureUpdate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateTextSubProcedure;
