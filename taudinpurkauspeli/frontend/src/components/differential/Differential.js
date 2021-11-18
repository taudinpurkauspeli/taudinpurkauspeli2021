/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const Differential = ({ id, name, description }) => (
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey={id}>
      {name}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={id}>
      <Card.Body>{description}</Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Differential;
