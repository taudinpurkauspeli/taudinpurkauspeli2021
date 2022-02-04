/* eslint-disable linebreak-style */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SubProcedure from './SubProcedure';

const SubProcedureList = ({ admin }) => {
  const listedSubProcedures = useSelector((state) => state.subProcedures.subProcedures && state
    .subProcedures.subProcedures
    .sort((a, b) => a.priority - b.priority));

  return (
    <Accordion>
      {listedSubProcedures && listedSubProcedures.map((d) => (
        <SubProcedure key={d.id} d={d} admin={admin} />
      ))}
    </Accordion>
  );
};

export default SubProcedureList;
