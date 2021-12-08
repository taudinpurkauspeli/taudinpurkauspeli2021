/* istanbul ignore file */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
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
        <div>
          <Button className="procedureButton"> {p.proceduresUnderCase.priority} {p.title} </Button>
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
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [proceduresHook, setProceduresHook] = useState([]);
  const [procedureToEdit, setProcedureToEdit] = useState(null);

  useEffect(() => {
    service
      .getAll(id)
      .then((procedureList) => {
        const list = procedureList[0].procedures;
        list.sort((a, b) => a.proceduresUnderCase.priority - b.proceduresUnderCase.priority);
        setProceduresHook(list);
      });
  }, []);

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

  const dragDropEditProcedure = (givenProcedure, index) => {
    // eslint-disable-next-line no-param-reassign
    const procedureUnderCaseObject = ({
      caseId: givenProcedure.proceduresUnderCase.caseId,
      procedureId: givenProcedure.proceduresUnderCase.procedureId,
      priority: index + 1,
    });
    // eslint-disable-next-line max-len
    serviceUnderProcedure.update(givenProcedure.proceduresUnderCase.procedureId, procedureUnderCaseObject);
  };

  /* istanbul ignore next */
  const handleDragEnd = () => {
    proceduresHook.map((p, index) => (
      dragDropEditProcedure(p, index)
    ));
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
