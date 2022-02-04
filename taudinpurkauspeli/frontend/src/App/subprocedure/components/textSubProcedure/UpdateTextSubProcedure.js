import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import UpdateTextSubProcedureForm from './UpdateTextSubProcedureForm';
import { updateTextSubprocedure } from '../../subProceduresReducer';
import { setSuccess, setError } from '../../../../utils/MessageBanner';

const UpdateTextSubProcedure = ({
  title,
  text,
  id,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleTextSubProcedureUpdate = (updatedObject) => {
    try {
      dispatch(updateTextSubprocedure(id, updatedObject));
      toggleVisibility();
      setSuccess(t('subProcedureUpdateSuccess'));
    } catch (error) {
      toggleVisibility();
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
            title={title}
            text={text}
            handleTextSubProcedureUpdate={handleTextSubProcedureUpdate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateTextSubProcedure;
