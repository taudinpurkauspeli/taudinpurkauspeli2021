import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CaseCard = ({ c, admin }) => {
  const { t } = useTranslation();

  return (
    <Card as={Link} to={`/cases/${c.id}`} style={{ width: '20rem', cursor: 'pointer' }} className="caseCard">
      <Card.Body>
        <Card.Title>{c.title}</Card.Title>
        <Card.Text>{c.anamnesis}</Card.Text>
        { admin && (
          <div>
            <Button className="copyButton" size="sm">{t('copy')}</Button>
            {' '}
            <Button className="removeButton" size="sm" variant="danger">{t('buttonRemove')}</Button>
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        <ProgressBar className="progsbar" variant="success" now={25} label={`${25}%`} />
      </Card.Footer>
    </Card>
  );
};

export default CaseCard;
