/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import service from '../../services/procedures';
import serviceUnderProcedure from '../../services/proceduresUnderCase';

const EditProcedure = ({ procedure, editProcedureFunc }) => {
  /* istanbul ignore next */
  const [newPriority, setNewPriority] = useState(procedure.proceduresUnderCase.priority);
  /* istanbul ignore next */
  const [newProcedureTitle, setNewProcedureTitle] = useState(procedure.title);
  /* istanbul ignore next */
  const { t } = useTranslation();
  /* istanbul ignore next */
  const history = useHistory();

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
    <div id="wrapper" key={procedure.proceduresUnderCase.priority}>
      <h2>{t('editProcedure')}</h2>

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
          />
        </p>
        <p>
          <input type="submit" id="submit" value={t('buttonEdit')} />
        </p>
      </form>
    </div>
  );
};

export default EditProcedure;
