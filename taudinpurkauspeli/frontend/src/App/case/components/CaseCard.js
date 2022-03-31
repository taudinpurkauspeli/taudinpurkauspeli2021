import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CopyCase from './CopyCase';
import ducService from '../../differential/services/differentialsUnderCasesService';
import pucService from '../../procedure/services/proceduresUnderCaseService';
import { removeCase } from '../casesReducer';

const CaseCard = ({ c, admin }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  /* istanbul ignore next */
  const createDifferentials = (copyId, result) => {
    for (let i = 0; i < result.length; i += 1) {
      const { id, description } = result[i];
      const object = {
        caseId: copyId,
        differentialId: id,
        description,
      };
      ducService.create(object);
    }
  };

  /* istanbul ignore next */
  const createProcedures = (copyId, result) => {
    for (let i = 0; i < result.length; i += 1) {
      const { procedureId, priority } = result[i];
      const object = {
        caseId: copyId,
        procedureId,
        priority,
      };
      pucService.create(object);
    }
  };

  /* istanbull ignore next */
  const handleCaseRemove = () => {
    // eslint-disable-next-line no-alert
    const confirmBox = window.confirm(t('deleteCaseConfirmation'));
    if (confirmBox === true) {
      dispatch(removeCase(c.id, t('deleteCaseSuccess'), t('deleteCaseError')));
    }
  };

  return (
    <div>
      <Card as={Link} to={`/cases/${c.id}`} style={{ width: '20rem', cursor: 'pointer' }} className="caseCard">
        <Card.Body>
          <Card.Title>{c.title}</Card.Title>
          <Card.Text>{c.anamnesis}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <ProgressBar className="progsbar" variant="success" now={25} label={`${25}%`} />
        </Card.Footer>
      </Card>

      { admin && (
        <div className="cardButtons">
          <Button className="editButton" as={Link} to={`/cases/${c.id}`} size="sm">{t('buttonEdit')}</Button>
          <CopyCase
            caseToBeCopied={c}
            createDifferentials={createDifferentials}
            createProcedures={createProcedures}
          />
          <Button className="removeButton" size="sm" variant="danger" onClick={handleCaseRemove}>{t('buttonRemove')}</Button>
        </div>
      )}
    </div>
  );
};

export default CaseCard;
