/* istanbul ignore file */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
} from 'react-bootstrap';
import service from '../../services/procedures/procedures';
import serviceUnderProcedure from '../../services/procedures/proceduresUnderCase';

const EditProcedure = ({ procedure, caseId, editProcedureFunc }) => {
  /* istanbul ignore next */
  const [newPriority, setNewPriority] = useState(procedure.proceduresUnderCase.priority);
  /* istanbul ignore next */
  const [newProcedureTitle, setNewProcedureTitle] = useState(procedure.title);
  /* istanbul ignore next */
  const { t } = useTranslation();
  /* istanbul ignore next */
  const history = useHistory();
  const baseUrl = `/cases/${caseId}`;

  /* istanbul ignore next */
  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  /* istanbul ignore next */
  const handleTitleChange = (event) => {
    setNewProcedureTitle(event.target.value);
  };

  /* istanbul ignore next */
  const editProcedure = (event) => {
    event.preventDefault();
    setNewProcedureTitle(event.target[0].value);
    setNewPriority(event.target[1].value);
    // eslint-disable-next-line no-param-reassign
    const procedureUnderCaseObject = ({
      caseId: procedure.proceduresUnderCase.caseId,
      procedureId: procedure.proceduresUnderCase.procedureId,
      priority: event.target[1].value,
    });

    const procedureObject = ({
      title: event.target[0].value,
    });

    if (editProcedureFunc != null) {
      editProcedureFunc(procedureUnderCaseObject);
    }
    service.update(procedure.id, procedureObject);
    serviceUnderProcedure.update(procedure.id, procedureUnderCaseObject);
    if (editProcedureFunc == null) {
      history.push('/');
    }
  };

  return (
    <div id="editProcedureForm" key={procedure.proceduresUnderCase.priority}>
      <h2>{t('editProcedure')}</h2>
      <Button className="procedureButton goTo" as={Link} to={`${baseUrl}/procedure/${procedure.id}`} style={{ margin: 15 }}>{t('goToProcedure')}</Button>
      <form onSubmit={(e) => editProcedure(e)}>
        <p>
          <label htmlFor="title">
            {t('procedureTitle')}
          </label>
          <br />
          <input
            id="title"
            type="text"
            defaultValue={procedure.title}
            onChange={handleTitleChange}
            className="formInput"
          />
        </p>
        <p>
          <label htmlFor="priority">
            {t('procedurePriority')}
          </label>
          <br />
          <input
            id="priority"
            type="integer"
            onChange={handlePriorityChange}
            defaultValue={procedure.proceduresUnderCase.priority}
            className="formInput"
          />
        </p>
        <p>
          <Button input type="submit" id="submit" className="submitButton">{t('buttonSave')}</Button>
        </p>
      </form>
    </div>
  );
};

export default EditProcedure;
