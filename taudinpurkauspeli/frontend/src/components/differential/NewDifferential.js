/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab, Alert,
} from 'react-bootstrap';
import service from '../../services/differentials';
import serviceUnderCases from '../../services/differentialsUnderCases';
import AddDifferentialForm from './AddDifferentialForm';
import SelectDifferentialForm from './SelectDifferentialForm';

const NewDifferential = ({ caseId }) => {
  const { t } = useTranslation();

  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [differentials, setDifferentials] = useState([]);

  React.useEffect(() => {
    service.getAll()
      .then((initialDifferentials) => {
        setDifferentials(initialDifferentials);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const toggleVisibility = () => setShow(!show);

  const handleSuccess = () => {
    toggleVisibility();
    setAlertMessage(t('differentialUpdateSuccess'));
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    toggleVisibility();
    setErrorMessage(t('differentialUpdateError'));
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const handleDifferentialSelection = (ducObject) => {
    serviceUnderCases.create(ducObject)
      .then(() => handleSuccess())
      .catch((error) => handleError(error));
  };

  const handleDifferentialAdd = (differentialObject) => {
    service.create({ name: differentialObject.name })
      .then((res) => {
        const differentialId = res[0].id;
        handleDifferentialSelection({
          caseId,
          differentialId,
          description: differentialObject.description,
        });
      });
  };

  return (
    <div>
      { alertMessage !== null && (
      <Alert variant="success">{alertMessage}</Alert>
      )}
      { errorMessage !== null && (
      <Alert variant="danger">{errorMessage}</Alert>
      )}
      <Button variant="primary" onClick={toggleVisibility} id="addNew">
        {t('buttonNewDifferential')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('addDifferential')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="select" id="differentials" className="mb-3">
            <Tab eventKey="select" title={t('selectExisting')}>
              <SelectDifferentialForm
                differentials={differentials}
                selectDifferential={handleDifferentialSelection}
                caseId={caseId}
              />
            </Tab>
            <Tab eventKey="add" title={t('addNewDifferential2')}>
              <AddDifferentialForm addDifferential={handleDifferentialAdd} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewDifferential;
