/* istanbul ignore file */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateProcedure } from '../reducers/proceduresReducer';

const EditProcedure = ({ procedure, caseId, editProcedureFunc }) => {
  const [newPriority, setNewPriority] = useState(procedure.priority);
  const [newProcedureTitle, setNewProcedureTitle] = useState(procedure.name);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const baseUrl = `/cases/${caseId}`;

  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewProcedureTitle(event.target.value);
  };

  const editProcedure = (event) => {
    event.preventDefault();
    setNewProcedureTitle(event.target[0].value);
    setNewPriority(event.target[1].value);
    // eslint-disable-next-line no-param-reassign

    const procedureToBeUpdated = {
      ...procedure,
      priority: Number(event.target[1].value),
      name: event.target[0].value,
    };

    if (editProcedureFunc != null) {
      editProcedureFunc(procedureToBeUpdated);
    }
    dispatch(updateProcedure(procedureToBeUpdated, t('procedureUpdateSuccess'), t('procedureUpdateError')));
  };

  return (
    <div id="editProcedureForm" key={procedure.priority}>
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
            defaultValue={procedure.name}
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
            defaultValue={procedure.priority}
            className="formInput"
          />
        </p>
        <p>
          <Button type="submit" id="submit" className="submitButton">{t('buttonSave')}</Button>
        </p>
      </form>
    </div>
  );
};

export default EditProcedure;
