import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import service from '../../services/procedures';
import serviceUnderProcedure from '../../services/proceduresUnderCase';

const EditProcedure = ({ procedure, editProcedureFunc }) => {
  const [newPriority, setNewPriority] = useState(procedure.proceduresUnderCase.priority);
  const [newProcedureTitle, setNewProcedureTitle] = useState(procedure.title);
  const { t } = useTranslation();
  const history = useHistory();

  const editProcedure = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    const procedureUnderCaseObject = ({
      caseId: procedure.proceduresUnderCase.caseId,
      procedureId: procedure.proceduresUnderCase.procedureId,
      priority: newPriority,
    });

    const procedureObject = ({
      title: newProcedureTitle,
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

  const handlePriorityChange = (event) => {
    setNewPriority(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewProcedureTitle(event.target.value);
  };

  return (
    <div id="wrapper">
      <h2>{t('editProcedure')}</h2>

      <form onSubmit={editProcedure}>
        <p>
          <label htmlFor="title">
            {t('procedureTitle')}
          </label>
          <br />
          <input
            id="title"
            type="text"
            value={newProcedureTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>
          <label htmlFor="priority">
            {t('procedurePriority')}
          </label>
          <br />
          <input
            id="title"
            type="integer"
            onChange={handlePriorityChange}
            value={procedure.priority}
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
