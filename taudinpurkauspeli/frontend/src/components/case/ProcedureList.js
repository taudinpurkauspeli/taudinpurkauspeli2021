/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef, useEffect } from 'react';
import service from '../../services/procedures';

const ProcedureList = ({ id }) => {
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [proceduresHook, setProceduresHook] = useState([]);

  useEffect(() => {
    service
      .getAll(id)
      .then((procedureList) => {
        setProceduresHook(procedureList[0].procedures);
      });
  }, []);
  console.log(proceduresHook);

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    const listCopy = [...proceduresHook];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setProceduresHook(listCopy);
  };

  return (
    <>
      {
        proceduresHook
        && proceduresHook.map((p, index) => (
          <li
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDragEnter(e, index)}
            key={index}
            draggable
          >
            {p.proceduresUnderCase.priority} {p.title}
          </li>
        ))
        }
    </>
  );
};

export default ProcedureList;
