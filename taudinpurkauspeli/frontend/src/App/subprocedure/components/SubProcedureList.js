/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SubProcedure from './SubProcedure';

const SubProcedureList = ({ procedureCaseId, admin }) => {
  const caseSubProcedures = useSelector((state) => state.subProcedures);
  const listedProcedures = caseSubProcedures
    .filter((p) => p.procedureCaseId === Number(procedureCaseId))
    .sort((a, b) => a.priority - b.priority);

  return (
    <Accordion>
      {listedProcedures.map((d) => (
        <SubProcedure key={d.id} d={d} admin={admin} />
      ))}
    </Accordion>
  );
};

export default SubProcedureList;
