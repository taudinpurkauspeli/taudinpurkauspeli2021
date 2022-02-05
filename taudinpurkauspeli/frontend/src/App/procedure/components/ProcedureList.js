/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { updateProcedurePriorities } from '../proceduresUnderCasesReducer';
import EditProcedure from './EditProcedure';

const DragNDropList = ({
  proceduresHook, handleDragStart, handleDragEnd, handleDragEnter, t, submitForm,
}) => (
  proceduresHook
    && proceduresHook.map((p, index) => (
      <h4
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnd={() => handleDragEnd()}
        onDragEnter={(e) => handleDragEnter(e, index)}
        key={index}
        draggable
      >
        <div className="rows">
          <Button className="procedureButton">
            {p.priority}
            &nbsp;
            {p.name}
          </Button>
          <form onSubmit={(e) => submitForm(p, e)} className="handleEdits">
            <Button type="submit" className="editButton" key={index} size="sm">{t('buttonEdit') }</Button>
          </form>
        </div>
      </h4>
    ))
);

const ProcedureList = ({ id }) => {
  /* istanbul ignore next */
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [proceduresHook, setProceduresHook] = useState([]);
  const [procedureToEdit, setProcedureToEdit] = useState(null);

  const initialProcedures = useSelector((state) => {
    const { proceduresUnderCase } = state;
    return proceduresUnderCase
      .sort((a, b) => a.priority - b.priority);
  });

  useEffect(() => {
    setProceduresHook(initialProcedures);
  }, [initialProcedures]);

  /* istanbul ignore next */
  const handleEditId = (p) => {
    setProcedureToEdit(p);
  };

  /* istanbul ignore next */
  const submitForm = (p, e) => {
    e.preventDefault();
    handleEditId(p);
  };

  /* istanbul ignore next */
  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  /* istanbul ignore next */
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

  /* istanbul ignore next */
  const handleDragEnd = () => {
    dispatch(updateProcedurePriorities(id, proceduresHook));
  };

  return (
    <>
      <DragNDropList
        proceduresHook={proceduresHook}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        t={t}
        submitForm={submitForm}
      />
      { procedureToEdit ? (
        <EditProcedure procedure={procedureToEdit} caseId={id} />
      ) : (
        <p> </p>
      )}
    </>
  );
};

export default ProcedureList;
