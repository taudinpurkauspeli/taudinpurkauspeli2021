/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HideCase = ({ c, hideCase }) => {
  const { t } = useTranslation();

  const [newHidden, setNewHidden] = useState(c.hidden);

  const handleVisibilityUpdate = (event) => {
    event.preventDefault();
    hideCase({
      title: c.title,
      anamnesis: c.anamnesis,
      hidden: newHidden,
    });
  };

  const handleHiddenChange = () => {
    setNewHidden(!newHidden);
  };

  return (
    <div>
      <form onSubmit={handleVisibilityUpdate} className="buttonLeft">
        <label htmlFor="submit" className="hidden">{newHidden ? t('buttonShowCaseToStudents') : t('buttonHideCaseFromStudents')}</label>
        <input type="submit" onClick={handleHiddenChange} id="submit" value={newHidden ? t('buttonShowCaseToStudents') : t('buttonHideCaseFromStudents')} />
      </form>
    </div>
  );
};

export default HideCase;
