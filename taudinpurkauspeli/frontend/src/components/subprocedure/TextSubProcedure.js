/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import UpdateTextSubProcedure from './UpdateTextSubProcedure';

const TextSubProcedure = ({
  id, title, text, admin,
// eslint-disable-next-line arrow-body-style
}) => {
  return (
    <div>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={id}>
          <div className="d-flex justify-content-between align-items-center">
            {title}
            {admin && (
              <div className="cardButtons">
                <UpdateTextSubProcedure id={id} title={title} text={text} />
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
};

export default TextSubProcedure;
