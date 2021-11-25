/* eslint-disable linebreak-style */
import React from 'react';
import { Card } from 'react-bootstrap';
import DifferentialList from '../DifferentialList';
import NewDifferential from '../NewDifferential';

const DifferentialGroup = ({
  diffGroupCaseId, name, admin,
}) => (
  <Card>
    <Card.Header>{name}</Card.Header>
    <Card.Body>
      <DifferentialList diffGroupCaseId={diffGroupCaseId} />
      {admin && (
        <NewDifferential diffGroupCaseId={diffGroupCaseId} />
      )}
    </Card.Body>
  </Card>
);

export default DifferentialGroup;
