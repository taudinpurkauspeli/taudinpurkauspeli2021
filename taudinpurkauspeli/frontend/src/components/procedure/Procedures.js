/* eslint-disable linebreak-style */
import React from 'react';
import { useParams } from 'react-router-dom';
import NewProcedure from './NewProcedure';
import ProcedureList from './ProcedureList';

const Procedures = ({ admin }) => {
  const { id } = useParams();

  return (
    <div id="wrapper">
      { admin && (
        <NewProcedure caseId={id} />
      )}
      <ProcedureList id={id} />
    </div>
  );
};

export default Procedures;
