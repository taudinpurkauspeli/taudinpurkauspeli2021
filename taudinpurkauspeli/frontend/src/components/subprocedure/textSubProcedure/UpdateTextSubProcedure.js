import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UpdateTextSubProcedureForm from './UpdateTextSubProcedureForm';
import service from '../../../services/procedures/textSubProcedures';
import { setSuccess, setError } from '../../../utils/MessageBanner';

const UpdateTextSubProcedure = ({
  title,
  text,
  id,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleTextSubProcedureUpdate = (updatedObject) => {
    service
      .update(id, updatedObject)
      .then(() => {
        toggleVisibility();
        setSuccess(t('subProcedureUpdateSuccess'));
      })
      .catch(() => {
        toggleVisibility();
        setError(t('subProcedureUpdateError'));
      });
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
