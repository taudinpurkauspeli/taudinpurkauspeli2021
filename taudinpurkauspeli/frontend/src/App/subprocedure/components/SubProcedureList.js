import React from 'react';
import { Accordion } from 'react-bootstrap';
import SubProcedure from './SubProcedure';

const SubProcedureList = ({ listedProcedures, admin }) => (
  <Accordion>
    {listedProcedures.map((d) => (
      <SubProcedure key={d.id} d={d} admin={admin} />
    ))}
  </Accordion>
);

export default SubProcedureList;
