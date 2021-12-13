import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import UpdateTextSubProcedure from './UpdateTextSubProcedure';

const TextSubProcedure = ({
  id, title, text, admin,
}) => (
  <div>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={id}>
        <div className="d-flex justify-content-between align-items-center">
          {title}
          {admin && (
            <div className="cardButtons">
              <UpdateTextSubProcedure title={title} text={text} id={id} />
            </div>
          )}
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>{text}</Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
);

export default TextSubProcedure;
