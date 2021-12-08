/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line no-unused-vars
const newProcedure = ({ id, addProcedure }) => {
  /* istanbul ignore next */
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleProcedureAdd = async (event) => {
    event.preventDefault();
    addProcedure({ title: newTitle });
    setNewTitle('');
  };

  return (
    <div>
      <h2>{t('addProcedure')}</h2>

      <form onSubmit={handleProcedureAdd}>
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
