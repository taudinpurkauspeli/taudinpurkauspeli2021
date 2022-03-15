import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HideCase = ({ c, hideCase }) => {
  const { t } = useTranslation();

  const [newHidden, setNewHidden] = useState(c.hidden);

  const handleVisibilityUpdate = (event) => {
    event.preventDefault();
    hideCase({
      ...c,
      hidden: newHidden,
    });
  };

  const handleHiddenChange = () => {
    setNewHidden(!newHidden);
  };

  return (
    <div>
      <form onSubmit={handleVisibilityUpdate}>
        <label htmlFor="submit" className="hidden">{newHidden ? t('buttonShowCaseToStudents') : t('buttonHideCaseFromStudents')}</label>
        <input id="submitHide" className="hideCase" type="submit" onClick={handleHiddenChange} size="sm" value={newHidden ? t('buttonShowCaseToStudents') : t('buttonHideCaseFromStudents')} />
      </form>
    </div>
  );
};

export default HideCase;
