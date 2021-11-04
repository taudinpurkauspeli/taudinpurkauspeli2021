import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import service from '../../services/cases';

const EditProcedure = ({ procedure, editProcedureFunc }) => {
  const [newPriority, setNewPriority] = useState(procedure.priority);
  const { t } = useTranslation();
  const history = useHistory();

  const editProcedure = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    const procedureObject = ({
      caseId: procedure.caseId,
      procedureId: procedure.procedureId,
      priority: newPriority,
    });

    if (editProcedureFunc != null) {
      editProcedureFunc(procedureObject);
    }
    service.update(procedure.id, procedureObject);
    if (editProcedureFunc == null) {
      history.push('/');
    }
  };

  const handlePriorityChange = (event) => {
    setNewPriority(event.value);
  };

  return (
    <div id="wrapper">
      <h2>{t('editProcedure')}</h2>

      <form onSubmit={editProcedure}>
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
