import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const ConclusionSubProcedure = ({ d }) => (
  <div>
    <Card style={{ width: '60rem' }}>
      <Accordion.Toggle as={Card.Header} eventKey={d.id}>
        <div className="d-flex justify-content-between align-items-center">
          {d.title}
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={d.id}>
        <Card.Body>{d.text}</Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
);

export default ConclusionSubProcedure;
