import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import service from '../../services/cases';

const HideCase = ({ caseToBeHidden, hideCaseFunc }) => {
  const c = caseToBeHidden;
  let hideStatus = false;

  if (hideCaseFunc == null) {
    hideStatus = c.hidden;
  }

  const [newHidden, setNewHidden] = useState(hideStatus);
  const { t } = useTranslation();

  const hideCase = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    const caseObject = ({
      title: c.title,
      anamnesis: c.anamnesis,
      hidden: newHidden,
    });

    if (hideCaseFunc != null) {
      hideCaseFunc(caseObject);
    }

    service.update(c.id, caseObject);
  };

  const handleHiddenChange = () => {
    setNewHidden(!newHidden);
  };

  return (
    <div>
      <form onSubmit={hideCase} className="buttonLeft">
        <label htmlFor="submit" className="hidden">{newHidden ? t('buttonShowCaseToStudents') : t('buttonHideCaseFromStudents')}</label>
        <input type="submit" onClick={handleHiddenChange} id="submit" value={newHidden ? t('buttonShowCaseToStudents') : t('buttonHideCaseFromStudents')} />
      </form>
    </div>
  );
};

export default HideCase;
