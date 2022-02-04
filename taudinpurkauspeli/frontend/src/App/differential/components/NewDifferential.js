/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddDifferentialForm from './AddDifferentialForm';
import SelectDifferentialForm from './SelectDifferentialForm';
import { setSuccess, setError } from '../../../utils/MessageBanner';
import { createDifferentialUnderCase } from '../reducers/differentialsUnderCasesReducer';
import { createDifferential } from '../reducers/differentialsReducer';

const NewDifferential = ({ diffGroupCaseId }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => setShow(!show);

  /* istanbul ignore next */
  const handleDifferentialSelection = (ducObject) => {
    toggleVisibility();
    try {
      dispatch(createDifferentialUnderCase(ducObject));
      setSuccess(t('differentialUpdateSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('differentialUpdateError'));
    }
  };

  /* istanbul ignore next */
  const handleDifferentialAdd = (differentialObject) => {
    toggleVisibility();
    try {
      dispatch(createDifferential(differentialObject, diffGroupCaseId));
      setSuccess(t('differentialUpdateSuccess'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(t('differentialUpdateError'));
    }
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
