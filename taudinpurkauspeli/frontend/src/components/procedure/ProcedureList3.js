/* eslint-disable react/style-prop-object */
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
import service from '../../services/procedures/procedures';
import EditProcedure from './EditProcedure';
import serviceUnderProcedure from '../../services/procedures/proceduresUnderCase';

const DragNDropList = ({
  proceduresHook, handleDragStart, handleDragEnd, handleDragEnter, t, submitForm, theCHANGE,
}) => (proceduresHook
    && proceduresHook.map((p, index) => (
      <h4
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnd={() => handleDragEnd()}
        onDragEnter={(e) => handleDragEnter(e, index, theCHANGE)}
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

const ProcedureList3 = ({ id }) => {
  /* istanbul ignore next */
  const { t } = useTranslation();
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [proceduresHook, setProceduresHook] = useState([]);
  const [procedureToEdit, setProcedureToEdit] = useState(null);
  const [proceduresTempList, setProceduresTempList] = useState([]);
  const [dataDrag, setDataDrag] = useState([]);

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
  const handleDragStart = (e, p, index) => {
    setDataDrag([index, p]);
  };

  /* istanbul ignore next */
  const handleDragEnter = (e, position, theCHANGE) => {
    e.preventDefault();
    dragOverItem.current = position;
    const listCopy = [...proceduresHook];
    listCopy[position].proceduresUnderCase.priority = theCHANGE;
    setProceduresTempList(listCopy);
  };

  const dragDropEditProcedure = (givenProcedure) => {
    // eslint-disable-next-line no-param-reassign
    const procedureUnderCaseObject = ({
      caseId: givenProcedure.proceduresUnderCase.caseId,
      procedureId: givenProcedure.proceduresUnderCase.procedureId,
      priority: givenProcedure.proceduresUnderCase.priority,
    });
    // eslint-disable-next-line max-len
    serviceUnderProcedure.update(givenProcedure.proceduresUnderCase.procedureId, procedureUnderCaseObject);
  };

  /* istanbul ignore next */
  const handleDragEnd = () => {
    setProceduresHook(proceduresTempList);
    proceduresHook.map((p, index) => (
      dragDropEditProcedure(p)
    ));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, priority) => {
    const index = dataDrag[0];
    const procedure = dataDrag[1];
    const listProcedures = proceduresHook;
    listProcedures[index].proceduresUnderCase.priority = priority;
    setProceduresHook(listProcedures);
    dragDropEditProcedure(procedure);
  };

  const dragDropBox = (nameOfClass, priority) => (
    <div
      className={nameOfClass}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => { handleDrop(e, 1); }}
    >
      <h1>{priority}</h1>
      {proceduresHook.forEach((p, index) => {
        console.log(proceduresHook);
        if (p.proceduresUnderCase.priority === priority) {
          console.log('hei');
            <h4
              onDragStart={(e) => handleDragStart(e, p, index)}
              key={index}
              draggable
            >
              <div>
                <Button className="procedureButton"> {p.proceduresUnderCase.priority} {p.title} </Button>
                <form onSubmit={(e) => submitForm(p, e)} className="handleEdits">
                  <Button type="submit" className="editButton" key={index} size="sm">{t('buttonEdit') }</Button>
                </form>
              </div>
            </h4>;
        }
      })}
    </div>
  );

  return (
    <>
      <h1>Ykköset</h1>

      {dragDropBox('tadaa yellow', 1)}

      <h1>Kakkoset</h1>
      {dragDropBox('tadaa orange', 2)}

      <h1>Kolmoset</h1>
      {dragDropBox('tadaa red', 3)}

    </>
  );
};

export default ProcedureList3;
