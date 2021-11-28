/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import serviceUnderCases from '../../services/differentials/differentialsUnderCases';
import Differential from './Differential';

const DifferentialList = ({ caseId }) => {
  const [caseDifferentials, setCaseDifferentials] = useState([]);

  React.useEffect(() => {
    serviceUnderCases.getAll(caseId)
      .then((initialDifferentials) => {
        setCaseDifferentials(initialDifferentials);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  return (
    <Accordion>
      {caseDifferentials.map((d) => (
        <Differential key={d.id} id={d.id} name={d.name} description={d.description} />
      ))}
    </Accordion>
  );
};

export default DifferentialList;
