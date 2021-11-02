import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import service from '../../services/procedures';
import serviceUnderCases from '../../services/proceduresUnderCase';

const newProcedure = ({ case, addProcedureFunc }) => {
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const addProcedure = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    const procedureObject = ({
      title: newTitle,
    });

    if (addProcedureFunc != null) {
      addProcedureFunc(procedureObject);
    }

    service.create(procedureObject)
      .then(() => {
        setNewTitle('');
      });
  };

  return (
    <div id="wrapper">
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
