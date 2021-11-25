/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import caseService from '../../services/cases';
import ducService from '../../services/differentialsUnderCases';
import pucService from '../../services/proceduresUnderCase';

const copyCase = ({
  caseToBeCopied, createProcedures, createDifferentials,
}) => {
  const { t } = useTranslation();
  const oldCaseId = caseToBeCopied.id;
  // eslint-disable-next-line no-unused-vars
  let newCopyId = 0;

  const handleCopy = (event) => {
    event.preventDefault();
    const caseObject = ({
      title: caseToBeCopied.title,
      anamnesis: caseToBeCopied.anamnesis,
      hidden: caseToBeCopied.hidden,
    });
    caseService.create(caseObject)
      .then((copy) => {
        newCopyId = copy.id;
      })
      .then(() => {
        ducService.getAll(oldCaseId)
          .then((result) => {
            createDifferentials(newCopyId, result);
          });
      })
      .then(() => {
        pucService.getAll(oldCaseId)
          .then((result) => {
            createProcedures(newCopyId, result);
          });
      });
  };

  return (
    <Button className="copyButton" size="sm" variant="warning" onClick={handleCopy}>{t('copy')}</Button>
  );
};

export default copyCase;
