import React, { useState, useEffect } from 'react';
import serviceUnderCases from '../../services/proceduresUnderCase';

const ProcedureList = ({ id }) => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    serviceUnderCases
      .getAll(id)
      .then((procedureList) => {
        setProcedures(procedureList);
      });
  }, []);

  return (
    <div>
      <ul>
        {procedures.map((p) => <li>{p.procedureId}</li>)}
      </ul>
    </div>
  );
};

export default ProcedureList;
