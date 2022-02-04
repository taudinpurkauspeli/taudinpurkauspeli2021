/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Tabs, Tab,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { addTextSubprocedure } from '../../subProceduresReducer';
import AddTextSubProcedure from './AddTextSubProcedure';
import { setSuccess, setError } from '../../../../utils/MessageBanner';

const NewTextSubProcedure = ({ proceduresId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  const handleTextSubProcedureAdd = (subProcedureObject) => {
    try {
      dispatch(addTextSubprocedure(subProcedureObject, proceduresId));
      toggleVisibility();
      setSuccess(t('textSubProcedureUpdateSuccess'));
    } catch (error) {
      toggleVisibility();
      setError(t('textSubProcedureUpdateError'));
    }
  };

  return (
    <div>
      <Button className="addButton text" onClick={toggleVisibility} size="sm">
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
          <Tabs defaultActiveKey="add" id="textSubProcedure" className="mb-3">
            <Tab eventKey="add" title={t('addNewTextSubProcedure2')}>
              <AddTextSubProcedure handleSubProcedureAdd={handleTextSubProcedureAdd} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTextSubProcedure;
