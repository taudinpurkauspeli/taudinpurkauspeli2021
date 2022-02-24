import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

const Option = ({
  id, name, description, isRequired,
}) => (
  <Card>
    <Accordion.Toggle className={`optionCard-${isRequired}`} as={Card.Header} eventKey={id}>
      {name}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={id}>
      <Card.Body>{description}</Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Option;
