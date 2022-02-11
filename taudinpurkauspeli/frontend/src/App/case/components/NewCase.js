/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import NewCaseForm from './NewCaseForm';
import { setSuccess, setError } from '../../../utils/MessageBanner';
import { createCase } from '../casesReducer';

const NewCase = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleCaseAdd = (newCase) => {
    toggleVisibility();
    try {
      dispatch(createCase(newCase));
      setSuccess(t('caseAddSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('caseAddError'));
    }
  };

  return (
    <div>
      <Button className="addButton" onClick={toggleVisibility} id="addNew">
        {t('buttonNewCase')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('addCase')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewCaseForm addCase={handleCaseAdd} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewCase;
