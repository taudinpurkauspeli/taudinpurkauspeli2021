/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab, Alert,
} from 'react-bootstrap';
import service from '../../services/subProcedures';
import serviceText from '../../services/textSubProcedures';
import AddTextSubProcedure from './AddTextSubProcedure';
import SelectTextSubForm from './SelectTextSubForm';

const NewTextSubProcedure = ({ proceduresId }) => {
  const { t } = useTranslation();

  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [textSubProcedures, setTextSubProcedures] = useState([]);

  React.useEffect(() => {
    service.getAll()
      .then((initialSubs) => {
        setTextSubProcedures(initialSubs);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const toggleVisibility = () => setShow(!show);

  const handleSuccess = () => {
    toggleVisibility();
    setAlertMessage(t('textSubProcedureUpdateSuccess'));
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    toggleVisibility();
    setErrorMessage(t('textSubProcedureUpdateError'));
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  // Textblaablaablaa lisäys rivi 52 - jotain
  const handleTextSubProcedureAdd = (cowObject) => {
    console.log(cowObject);
    serviceText.create(cowObject)
      .then(() => handleSuccess())
      .catch((error) => handleError(error));
  };

  // subProcedurin lisäys alla olevat rivit - jotain, sitten kutsutaan rivin 52 funktiota
  const handleSubProcedureAdd = (subProcedureObject) => {
    service.create({ priority: subProcedureObject.priority, type: subProcedureObject.type })
      .then((res) => {
        const totalSubId = res.id;
        handleTextSubProcedureAdd({
          totalSubId,
          proceduresId,
          title: subProcedureObject.title,
          text: subProcedureObject.text,
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
        {t('buttonAddNewText')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('addTextSubProcedure')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="select" id="textSubProcedure" className="mb-3">
            {/*             <Tab eventKey="select" title={t('selectExisting')}>
              <SelectTextSubForm
                textSubProcedures={textSubProcedures}
                selectTextSubProcedure={handleTextSubProcedureAdd}
                proceduresId={proceduresId}
              />
            </Tab> */}
            <Tab eventKey="add" title={t('addNewTextSubProcedure2')}>
              <AddTextSubProcedure handleSubProcedureAdd={handleSubProcedureAdd} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTextSubProcedure;
