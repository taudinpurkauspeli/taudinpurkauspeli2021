/* eslint-disable linebreak-style */
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
import RemoveCase from './RemoveCase';
import { setError, setSuccess } from '../../../utils/MessageBanner';
import ducService from '../../../services/differentials/differentialsUnderCases';
import pucService from '../../../services/procedures/proceduresUnderCase';
import { removeCase } from '../reducers/casesReducer';

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
      try {
        dispatch(removeCase(c.id));
        setSuccess(t('deleteCaseSuccess'));
      } catch (error) {
        setError(t('deleteCaseError'));
      }
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
          <RemoveCase caseToBeRemoved={c} deleteCase={handleCaseRemove} />
        </div>
      )}
    </div>
  );
};

export default CaseCard;
