/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import service from '../../services/procedures';

const ProcedureList = ({ id }) => {
  const [proceduresHook, setProceduresHook] = useState([]);

  useEffect(() => {
    service
      .getAll(id)
      .then((procedureList) => {
        setProceduresHook(procedureList[0].procedures);
      });
  }, []);
  console.log(proceduresHook);

  return (
    <div>
      <ul>
        {proceduresHook.map((p) => <li> {p.proceduresUnderCase.priority} {p.title} </li>)}
      </ul>
    </div>
  );
};

export default ProcedureList;
