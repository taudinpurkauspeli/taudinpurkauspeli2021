/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import AddDifferentialGroupForm from './AddDifferentialGroupForm';
import SelectDifferentialGroupForm from './SelectDifferentialGroupForm';
import { setSuccess, setError } from '../../../../utils/MessageBanner';
import { createDifferentialGroupUnderCase } from '../../reducers/differentialGroupsUnderCasesReducer';
import { createDifferentialGroup } from '../../reducers/differentialGroupsReducer';

const NewDifferentialGroup = ({ caseId }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleDifferentialGroupSelection = (differentialGroupId) => {
    toggleVisibility();
    try {
      dispatch(createDifferentialGroupUnderCase({ differentialGroupId, caseId: Number(caseId) }));
      setSuccess(t('differentialGroupUpdateSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('differentialGroupUpdateError'));
    }
  };

  /* istanbul ignore next */
  const handleDifferentialGroupAdd = (differentialGroupObject) => {
    toggleVisibility();
    try {
      dispatch(createDifferentialGroup(Number(caseId), differentialGroupObject));
      setSuccess(t('differentialGroupUpdateSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('differentialGroupUpdateError'));
    }
  };

  return (
    <div>
      <Button className="addButton" onClick={toggleVisibility} id="addNew">
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
