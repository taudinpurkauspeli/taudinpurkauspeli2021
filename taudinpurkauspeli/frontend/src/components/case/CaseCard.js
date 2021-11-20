/* eslint-disable linebreak-style */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RemoveCase from './RemoveCase';
import CopyCase from './CopyCase';

const CaseCard = ({ c, admin }) => {
  const { t } = useTranslation();

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
          <Button as={Link} to={`/cases/${c.id}`} className="editButton" size="sm">{t('buttonEdit')}</Button>
          <CopyCase caseToBeCopied={c} />
          <RemoveCase caseToBeRemoved={c} />
        </div>
      )}
    </div>
  );
};

export default CaseCard;
