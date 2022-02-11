/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Differential from './Differential';

const DifferentialList = ({ diffGroupCaseId }) => {
  const caseDifferentials = useSelector((state) => state.differentialsUnderCase);
  const diffGroupDiffs = caseDifferentials.filter((d) => d.diffGroupCaseId === diffGroupCaseId);

  return (
    <Accordion>
      {diffGroupDiffs.map((d) => (
        <Differential key={d.id} id={d.id} name={d.name} description={d.description} />
      ))}
    </Accordion>
  );
};

export default DifferentialList;
