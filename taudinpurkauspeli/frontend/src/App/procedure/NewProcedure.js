/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal,
} from 'react-bootstrap';

import NewProcedureForm from './NewProcedureForm';
import service from '../../services/procedures/procedures';
import serviceUnderCases from '../../services/procedures/proceduresUnderCase';
import { setSuccess, setError } from '../../utils/MessageBanner';

// eslint-disable-next-line no-unused-vars
const newProcedure = ({ caseId }) => {
  /* istanbul ignore next */
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleProcedureAdd = (procedureObject) => {
    service.create(procedureObject)
      .then((data) => {
        toggleVisibility();
        setSuccess(t('procedureAddSuccess'));
        const procedureUnderCaseObject = ({
          caseId,
          procedureId: data.id,
          priority: 1,
        });

        serviceUnderCases.create(procedureUnderCaseObject);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        toggleVisibility();
        setError(t('procedureAddError'));
      });
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
