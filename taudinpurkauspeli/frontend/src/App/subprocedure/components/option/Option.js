import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const Option = ({ optionObject }) => (
  <Card>
    <Accordion.Toggle
      className={`optionCard-${optionObject.isRequired}`}
      as={Card.Header}
      eventKey={optionObject.id}
    >
      {optionObject.name}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={optionObject.id}>
      <Card.Body>{optionObject.description}</Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Option;
