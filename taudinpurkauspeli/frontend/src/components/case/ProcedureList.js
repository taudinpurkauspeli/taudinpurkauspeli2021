/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import service from '../../services/procedures';
import EditProcedure from './EditProcedure';
import serviceUnderProcedure from '../../services/proceduresUnderCase';

const ProcedureList = ({ id }) => {
  const { t } = useTranslation();
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [proceduresHook, setProceduresHook] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [procedureToEdit, setProcedureToEdit] = useState({ id: '', title: '' });

  useEffect(() => {
    service
      .getAll(id)
      .then((procedureList) => {
        const list = procedureList[0].procedures;
        list.sort((a, b) => a.proceduresUnderCase.priority - b.proceduresUnderCase.priority);
        setProceduresHook(list);
      });
  }, []);
  console.log(proceduresHook);

  const handleEditId = (p) => {
    console.log(p);
    /* setEditId(p.value.proceduresUnderCase.id);
    setProcedureToEdit(p.value); */
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

  const editProcedure = (givenProcedure, index) => {
    // eslint-disable-next-line no-param-reassign
    const procedureUnderCaseObject = ({
      caseId: givenProcedure.proceduresUnderCase.caseId,
      procedureId: givenProcedure.proceduresUnderCase.procedureId,
      priority: index + 1,
    });
    // eslint-disable-next-line max-len
    serviceUnderProcedure.update(givenProcedure.proceduresUnderCase.procedureId, procedureUnderCaseObject);
    console.log(givenProcedure);
  };

  const handleDragEnd = () => {
    proceduresHook.map((p, index) => (
      editProcedure(p, index)
    ));
  };

  return (
    <>
      { proceduresHook
        && proceduresHook.map((p, index) => (
          <h4
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={() => handleDragEnd()}
            onDragEnter={(e) => handleDragEnter(e, index)}
            key={index}
            draggable
          >
            <div>
              <Button className="procedureButton"> {p.proceduresUnderCase.priority} {p.title} </Button>
              <Button className="editButton" size="sm" onClick={handleEditId(p)}>{t('buttonEdit') }</Button>
            </div>
          </h4>
        ))}
      {editId !== -1 && (
        <>uggabugga</>
      )}
    </>
  );
};

export default ProcedureList;
