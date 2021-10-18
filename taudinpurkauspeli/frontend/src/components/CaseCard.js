import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Button,
  ProgressBar,
} from 'react-bootstrap';

const CaseCard = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <Card style={{ width: '18rem' }} className="caseCard">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button>{t('button_play')}</Button>
      </Card.Body>
      <Card.Footer>
        <ProgressBar className="progsbar" variant="success" now={25} label={`${25}%`} />
      </Card.Footer>
    </Card>
  );
};

export default CaseCard;
