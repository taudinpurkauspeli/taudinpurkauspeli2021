/* eslint-disable linebreak-style */

/* eslint-disable react/react-in-jsx-scope */
import { Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import caseService from '../../services/cases';
import pucService from '../../services/proceduresUnderCase';

// Caseen liitetyt diffiryhmät
import ducGroupService from '../../services/differentials/differentialGroupsUnderCases';

// diffiryhmään liitetyt diffit
import ducService from '../../services/differentials/differentialsUnderCases';

const copyCase = ({
  caseToBeCopied, createProcedures,
}) => {
  const { t } = useTranslation();
  const oldCaseId = caseToBeCopied.id;
  // eslint-disable-next-line no-unused-vars
  let newCopyId = 0;

  /* istanbul ignore next */
  const copyTheDamnThing = (newCaseId, result) => {
    console.log(result);
    let duckling = {};

    if (result == null) {
      console.log('Kääk!');
    } else {
      result.forEach((element) => {
        console.log(element.id);
        duckling = {
          caseId: newCaseId,
          differentialGroupId: element.id,
        };
        ducGroupService.create(duckling).then((res) => {
          const diffGroupCaseId = res.id;
          ducService.getAll(element.differentialGroupId)
            .then((result2) => {
              result2.forEach((element2) => {
                const did = element2.differentialId;
                const plaa = {
                  diffGroupCaseId,
                  differentialId: did,
                  description: element2.description,
                };
                ducService.create(plaa);
              });
            });
        });
      });
    }
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
    <Button className="copyButton" size="sm" variant="warning" onClick={handleCopy}>{t('copy')}</Button>
  );
};

export default copyCase;
