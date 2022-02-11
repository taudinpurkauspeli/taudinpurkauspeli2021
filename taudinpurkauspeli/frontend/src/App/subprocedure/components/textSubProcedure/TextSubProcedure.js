import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import UpdateTextSubProcedure from './UpdateTextSubProcedure';

const TextSubProcedure = ({
  d, admin,
}) => (
  <div>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={d.id}>
        <div className="d-flex justify-content-between align-items-center">
          {d.title}
          {admin && (
            <div className="cardButtons">
              <UpdateTextSubProcedure d={d} />
            </div>
          )}
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={d.id}>
        <Card.Body>{d.text}</Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
);

export default TextSubProcedure;
