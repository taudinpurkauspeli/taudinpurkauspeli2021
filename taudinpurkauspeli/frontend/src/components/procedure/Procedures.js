import React from 'react';
import NewProcedure from './NewProcedure';
import ProcedureList from './ProcedureList';

const Procedures = ({ id }) => (
  <div>
    <p>Toimenpiteet löytyvät täältä</p>
    <NewProcedure id={id} />
    <ProcedureList id={id} />
  </div>
);

export default Procedures;
