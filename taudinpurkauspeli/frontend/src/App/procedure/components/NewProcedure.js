/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import NewProcedureForm from './NewProcedureForm';
import { setSuccess, setError } from '../../../utils/MessageBanner';
import { addProcedure } from '../proceduresReducer';

// eslint-disable-next-line no-unused-vars
const newProcedure = ({ caseId }) => {
  /* istanbul ignore next */
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleProcedureAdd = (procedureObject) => {
    try {
      dispatch(addProcedure(caseId, procedureObject));
      toggleVisibility();
      setSuccess(t('procedureAddSuccess'));
    } catch (error) {
      toggleVisibility();
      setError(t('procedureAddError'));
    }
  };

  return (
    <div>
      <Button className="addButton" onClick={toggleVisibility}>
        {t('buttonNewProcedure')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('addProcedure')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProcedureForm addProcedure={handleProcedureAdd} />
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default newProcedure;
