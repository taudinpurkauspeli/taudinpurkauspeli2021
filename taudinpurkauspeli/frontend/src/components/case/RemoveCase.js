/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import service from '../../services/cases';

const removeCase = ({ caseToBeRemoved, removeCaseFunc }) => {
  const { t } = useTranslation();

  const handleDelete = (event) => {
    event.preventDefault();

    if (removeCaseFunc != null) {
      removeCaseFunc(caseToBeRemoved.id);
    }
    // eslint-disable-next-line no-alert
    // const confirmBox = window.confirm(t('deleteCaseConfirmation'));
    // if (confirmBox === true) {
    service.remove(caseToBeRemoved.id)
      .then((response) => (response.message));
    // }
  };

  return (
    <Button className="removeButton" size="sm" variant="danger" onClick={handleDelete}>{t('buttonRemove')}</Button>
  );
};

export default removeCase;
