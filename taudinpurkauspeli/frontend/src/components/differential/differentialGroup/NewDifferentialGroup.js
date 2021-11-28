/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap';

import serviceUnderCases from '../../../services/differentials/differentialGroupsUnderCases';
import service from '../../../services/differentials/differentialGroups';
import AddDifferentialGroupForm from './AddDifferentialGroupForm';
import SelectDifferentialGroupForm from './SelectDifferentialGroupForm';
import { setSuccess, setError } from '../../utils/MessageBanner';

const NewDifferentialGroup = ({ caseId }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [differentialGroups, setDifferentialGroups] = useState([]);

  React.useEffect(() => {
    service.getAll()
      .then((initialDifferentialGroups) => {
        setDifferentialGroups(initialDifferentialGroups);
      })
      .catch((error) => {
        /* istanbul ignore next */
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleDifferentialGroupSelection = (newObject) => {
    serviceUnderCases.create(newObject)
      .then(() => {
        toggleVisibility();
        setSuccess(t('differentialGroupUpdateSuccess'));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        toggleVisibility();
        setError(t('differentialGroupUpdateError'));
      });
  };

  /* istanbul ignore next */
  const handleDifferentialGroupAdd = (differentialGroupObject) => {
    service.create({ name: differentialGroupObject.name })
      .then((res) => {
        const differentialGroupId = res[0].id;
        handleDifferentialGroupSelection({
          caseId,
          differentialGroupId,
        });
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={toggleVisibility} id="addNew">
        {t('buttonNewDifferentialGroup')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('addDifferentialGroup')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="select" id="differentialGroups" className="mb-3">
            <Tab eventKey="select" title={t('selectExisting')}>
              <SelectDifferentialGroupForm
                differentialGroups={differentialGroups}
                selectDifferentialGroup={handleDifferentialGroupSelection}
                caseId={caseId}
              />
            </Tab>
            <Tab eventKey="add" title={t('addNewDifferential2')}>
              <AddDifferentialGroupForm addDifferentialGroup={handleDifferentialGroupAdd} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewDifferentialGroup;
