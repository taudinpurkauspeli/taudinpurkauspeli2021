/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import caseService from '../../services/cases';
import ducService from '../../services/differentialsUnderCases';
import pucService from '../../services/proceduresUnderCase';

const copyCase = ({ caseToBeCopied, copyCaseFunc }) => {
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
    if (copyCaseFunc !== undefined) {
      copyCaseFunc(caseObject);
    } else {
      caseService.create(caseObject)
        .then((copy) => {
          newCopyId = copy.id;
        });
    }
    ducService.getAll(oldCaseId)
      .then((result) => {
        for (let i = 0; i < result.length; i += 1) {
          const { id, description } = result[i];
          const object = {
            caseId: newCopyId,
            differentialId: id,
            description,
          };
          ducService.create(object);
        }
      });
    pucService.getAll()
      .then((result) => {
        for (let i = 0; i < result.length; i += 1) {
          const { procedureId, priority } = result[i];
          const object = {
            caseId: newCopyId,
            procedureId,
            priority,
          };
          pucService.create(object);
        }
      });
  };

  return (
    <Button className="copyButton" size="sm" variant="warning" onClick={handleCopy}>{t('copy')}</Button>
  );
};

export default copyCase;
