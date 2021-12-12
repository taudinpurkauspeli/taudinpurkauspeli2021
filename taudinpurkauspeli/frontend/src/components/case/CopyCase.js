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
    console.log('rivi 26');
    let duckling = {};

    if (result == null) {
      console.log('Kääk!');
    } else {
      result.forEach((element) => {
        duckling = {
          caseId: newCaseId,
          differentialGroupId: element.id,
        };
        console.log('Rivi 36');
        ducGroupService.create(duckling).then((res) => {
          ducService.getAll(element.diffGroupCaseId)
            .then((result2) => {
              result2.forEach((element2) => {
                console.log('Ollaan loopissa');
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
    console.log('Rivi 65');
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
        console.log('oldcaseid', oldCaseId);
        pucService.getAll(oldCaseId)
          .then((res) => {
            console.log(res);
            console.log('newcopyid', newCopyId);
            createProcedures(newCopyId, res);
          });
      });
  };

  return (
    <Button className="copyButton" size="sm" variant="warning" onClick={handleCopy}>{t('copy')}</Button>
  );
};

export default copyCase;
