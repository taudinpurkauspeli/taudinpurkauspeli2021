/* eslint-disable linebreak-style */
import React from 'react';
import { useParams } from 'react-router-dom';
import NewProcedure from './NewProcedure';
import ProcedureList from './ProcedureList';

const Procedures = () => {
  const { id } = useParams();

  return (
    <div id="wrapper">
      <NewProcedure id={id} />
      <ProcedureList id={id} />
    </div>
  );
};

export default Procedures;
