/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap';
import service from '../../services/differentials/differentials';
import serviceUnderCases from '../../services/differentials/differentialsUnderCases';
import AddDifferentialForm from './AddDifferentialForm';
import SelectDifferentialForm from './SelectDifferentialForm';
import { setSuccess, setError } from '../../utils/MessageBanner';

const NewDifferential = ({ diffGroupCaseId }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [differentials, setDifferentials] = useState([]);

  React.useEffect(() => {
    service.getAll()
      .then((initialDifferentials) => {
        setDifferentials(initialDifferentials);
      })
      .catch((error) => {
        /* istanbul ignore next */
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleDifferentialSelection = (ducObject) => {
    serviceUnderCases.create(ducObject)
      .then(() => {
        toggleVisibility();
        setSuccess(t('differentialUpdateSuccess'));
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.log(error);
        toggleVisibility();
        setError(t('differentialUpdateError'));
      });
  };

  /* istanbul ignore next */
  const handleDifferentialAdd = (differentialObject) => {
    service.create({ name: differentialObject.name })
      .then((res) => {
        const differentialId = res.id;
        handleDifferentialSelection({
          diffGroupCaseId,
          differentialId,
          description: differentialObject.description,
        });
      });
  };

  return (
    <div id="newDifferential">
      <Button className="addButton" onClick={toggleVisibility} id="addNew">
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
                diffGroupCaseId={diffGroupCaseId}
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
