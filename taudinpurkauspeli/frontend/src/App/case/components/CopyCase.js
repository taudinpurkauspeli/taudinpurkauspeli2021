/* eslint-disable linebreak-style */

/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import caseService from '../casesService';
import ducService from '../../differential/services/differentialsUnderCases';
import pucService from '../../procedure/proceduresUnderCaseService';

// Caseen liitetyt diffiryhmät
import ducGroupService from '../../differential/services/differentialGroupsUnderCases';

const copyCase = ({
  caseToBeCopied, createProcedures,
}) => {
  const { t } = useTranslation();
  const oldCaseId = caseToBeCopied.id;
  // eslint-disable-next-line no-unused-vars
  let newCopyId = 0;

  /* istanbul ignore next */
  const copyTheDamnThing = (newCaseId, result) => {
    let duckling = {};
    result.forEach((element) => {
      duckling = {
        caseId: newCaseId,
        differentialGroupId: element.id,
      };
      ducGroupService.create(duckling).then((res) => {
        ducService.getAll(element.diffGroupCaseId)
          .then((result2) => {
            result2.forEach((element2) => {
              const did = element2.id;
              const plaa = {
                diffGroupCaseId: res.id,
                differentialId: did,
                description: element2.description,
              };
              ducService.create(plaa);
            });
          });
      });
    });
  };

  /* istanbul ignore next */
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
        ducGroupService.getAll(oldCaseId)
          .then((res) => {
            copyTheDamnThing(newCopyId, res);
          });
      })
      .then(() => {
        pucService.getAll(oldCaseId)
          .then((res) => {
            createProcedures(newCopyId, res);
          });
      });
  };

  return (
    <Button variant="warning" size="sm" onClick={handleCopy}>{t('copy')}</Button>
  );
};

export default copyCase;
