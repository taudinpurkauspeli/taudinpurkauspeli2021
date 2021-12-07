/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const TextSubProcedure = ({ id, title, text }) => (
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey={id}>
      {title}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={id}>
      <Card.Body>{text}</Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default TextSubProcedure;
