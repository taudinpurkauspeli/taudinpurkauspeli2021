/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import service from '../../services/procedures';
import EditProcedure from './EditProcedure';

const ProcedureList = ({ id }) => {
  const { t } = useTranslation();
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [proceduresHook, setProceduresHook] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [procedureToEdit, setProcedureToEdit] = useState({});

  useEffect(() => {
    service
      .getAll(id)
      .then((procedureList) => {
        setProceduresHook(procedureList[0].procedures);
      });
  }, []);
  console.log(proceduresHook);

  const handleEditId = (p) => {
    console.log(p.value);
    setEditId(p.value.id);
    setProcedureToEdit(p.value);
  };

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
          <h4
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDragEnter(e, index)}
            key={index}
            draggable
          >
            <div className="procedureButtons">
              {p.proceduresUnderCase.priority} {p.title} <Button className="editButton" size="sm" value={p} onClick={handleEditId}>{t('buttonEdit') }</Button>
            </div>
          </h4>
        ))
        }
      {editId !== -1 && (
        <EditProcedure procedure={procedureToEdit} />
      )}
    </>
  );
};

export default ProcedureList;
