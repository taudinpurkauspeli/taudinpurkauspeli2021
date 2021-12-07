/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import subProcedures from '../../services/subProcedures';
import SubProcedure from './SubProcedure';

const SubProcedureList = ({ proceduresId }) => {
  // eslint-disable-next-line no-unused-vars
  const [listedSubProcedures, setListedSubProcedures] = useState([]);

  React.useEffect(() => {
    subProcedures.getAllId(proceduresId)
      .then((initialSubProcedures) => {
        const list = initialSubProcedures[0].subProcedures;
        list.sort((a, b) => a.priority - b.priority);
        setListedSubProcedures(list);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  return (
    <Accordion>
      {listedSubProcedures.map((d) => (
        <SubProcedure d={d} />
      ))}
    </Accordion>
  );
};

export default SubProcedureList;
