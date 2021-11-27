/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal,
} from 'react-bootstrap';

import service from '../../services/cases';
import NewCaseForm from './NewCaseForm';
import { setSuccess, setError } from '../utils/MessageBanner';

const NewCase = () => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleCaseAdd = (newCase) => {
    service.create(newCase)
      .then(() => {
        toggleVisibility();
        setSuccess(t('caseAddSuccess'));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        toggleVisibility();
        setError(t('caseAddError'));
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={toggleVisibility} id="addNew">
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
