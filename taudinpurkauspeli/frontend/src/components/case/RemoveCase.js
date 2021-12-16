/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

const removeCase = ({ caseToBeRemoved, deleteCase }) => {
  const { t } = useTranslation();

  const handleDelete = (event) => {
    event.preventDefault();
    deleteCase(caseToBeRemoved.id);
  };

  return (
    <Button className="removeButton" size="sm" variant="danger" onClick={handleDelete}>{t('buttonRemove')}</Button>
  );
};

export default removeCase;
