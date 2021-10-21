import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import service from '../services/cases';

const newCase = ({ addCaseFunc }) => {
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState('');
  const [newAnamnesis, setNewAnamnesis] = useState('');
  const [newHidden, setNewHidden] = useState(false);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAnamnesisChange = (event) => {
    setNewAnamnesis(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setNewHidden(event.target.value);
  };

  const addCase = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    const caseObject = ({
      title: newTitle,
      anamnesis: newAnamnesis,
      hidden: newHidden,
    });

    if (addCaseFunc != null) {
      addCaseFunc(caseObject);
    } else {
      service.create(caseObject)
        .then(() => {
          setNewTitle('');
          setNewAnamnesis('');
          setNewHidden(false);
        });
    }
  };

  return (
    <div id="wrapper">
      <h2>{t('addCase')}</h2>

      <form onSubmit={addCase}>
        <p>
          <label htmlFor="title">
            {t('caseTitle')}
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
          <label htmlFor="anamnesis">{t('caseAnamnesis')}</label>
          <br />
          <textarea
            id="anamnesis"
            type="textarea"
            value={newAnamnesis}
            onChange={handleAnamnesisChange}
          />
        </p>
        <p>
          <label htmlFor="hidden">{t('hideCase')}</label>
          <br />
          <input
            id="hidden"
            value={newHidden}
            type="checkbox"
            onClick={handleHiddenChange}
          />
        </p>
        <p>
          <input type="submit" id="submit" value={t('button_submitNewCase')} />
        </p>
      </form>

    </div>
  );
};

export default newCase;
