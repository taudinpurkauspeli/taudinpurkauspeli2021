/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import service from '../../services/cases';

const removeCase = ({ caseToBeRemoved, removeCaseFunc }) => {
  const { t } = useTranslation();

  const deleteCase = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t('deleteCaseConfirmation'));
    if (confirmBox === true) {
      if (removeCaseFunc != null) {
        removeCaseFunc(caseToBeRemoved.id);
      }
      service.remove(caseToBeRemoved.id);
    }
  };

  return (
    <Button className="removeButton" size="sm" variant="danger" onClick={deleteCase}>{t('buttonRemove')}</Button>
  );
};

export default removeCase;
