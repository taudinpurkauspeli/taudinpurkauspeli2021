/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import service from '../../services/procedures';
import serviceUnderCases from '../../services/proceduresUnderCase';

// eslint-disable-next-line no-unused-vars
const newProcedure = ({ id, addProcedureFunc }) => {
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState('');
  //  const [procedures, setProcedures] = useState([]);

  /*   useEffect(() => {
    service
      .getAll()
      .then((proceduresList) => {
        setProcedures(proceduresList);
      });
  }); */

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const addProcedure = async (event) => {
    event.preventDefault();

    const procedureObject = ({
      title: newTitle,
    });

    if (addProcedureFunc != null) {
      addProcedureFunc(procedureObject);
    } else {
      const receivedID = await service.create(procedureObject)
        .then((data) => {
          setNewTitle('');
          return data.id;
        });

      const procedureUnderCaseObject = ({
        caseId: id,
        procedureId: receivedID,
        priority: 1,
      });

      serviceUnderCases.create(procedureUnderCaseObject);
    }
  };

  return (
    <div>
      <h2>{t('addProcedure')}</h2>

      <form onSubmit={addProcedure}>
        <p>
          <label htmlFor="title">
            {t('procedureTitle')}
          </label>
          <br />
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>
          <input type="submit" id="submit" value={t('buttonSubmitNewProcedure')} />
        </p>
      </form>

    </div>
  );
};

export default newProcedure;
