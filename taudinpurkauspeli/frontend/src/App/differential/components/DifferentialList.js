/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Differential from './Differential';

const DifferentialList = ({ diffGroupCaseId, admin }) => {
  const caseDifferentials = useSelector((state) => state.differentialsUnderCase);
  const diffGroupDiffs = caseDifferentials.filter((d) => d.diffGroupCaseId === diffGroupCaseId);

  return (
    <Accordion>
      {diffGroupDiffs.map((d) => (
        <Differential
          key={d.id}
          d={d}
          admin={admin}
        />
      ))}
    </Accordion>
  );
};

export default DifferentialList;
