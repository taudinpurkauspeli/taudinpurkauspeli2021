/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import service from '../../services/procedures/procedures';

const ProcedureList2 = ({ id }) => {
  const { t } = useTranslation();
  const [proceduresHook, setProceduresHook] = useState([]);
  const [numberOnes, setNumberOnes] = useState([]);
  const [numberDos, setNumberDos] = useState([]);

  const onDragStart = (ev, index) => {
    console.log('dragstart:', index);
    ev.dataTransfer.setData('index', index);
  };

  const handleSetNumberOnes = () => {
    const list = proceduresHook.filter((p) => p.proceduresUnderCase.priority === 1);
    console.log('tää on ykkösen lista');
    console.log(list);
    const list2 = list.map((p, index) => (
      <h4
        onDragStart={(e) => onDragStart(e, index)}
        key={index}
        draggable
        className="draggable"
      >
        <div>
          {p.proceduresUnderCase.priority}
          {p.title}
        </div>
      </h4>
    ));
    setNumberOnes(list2);
  };

  const handleSetNumberDos = () => {
    const list = proceduresHook.filter((p) => p.proceduresUnderCase.priority === 2);
    const list2 = list.map((p, index) => (
      <h4
        onDragStart={(e) => onDragStart(e, index)}
        key={index}
        draggable
        className="draggable"
      >
        <div>
          {p.proceduresUnderCase.priority}
          {p.title}
        </div>
      </h4>
    ));
    setNumberDos(list2);
  };

  useEffect(() => {
    service
      .getAll(id)
      .then((procedureList) => {
        const list = procedureList[0].procedures;
        list.sort((a, b) => a.proceduresUnderCase.priority - b.proceduresUnderCase.priority);

        setProceduresHook(list);
        handleSetNumberOnes();
        handleSetNumberDos();
        console.log('tää on procedureshook');
        console.log(proceduresHook);
        console.log('tää on ykköset');
        console.log(numberOnes);
        console.log('tää on kakkoset');
        console.log(numberDos);
      });
  }, []);

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    const index = ev.dataTransfer.getData('index');
    const listProcedures = proceduresHook;
    listProcedures[index].priority = cat;
    setProceduresHook(listProcedures);
  };

  return (
    <div className="container-drag">
      <h2 className="header">DRAG and DROP DEMO</h2>
      <div
        className="wip"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => { onDrop(e, 1); }}
      >
        <span className="task-header">WIP</span>
        {numberOnes}
      </div>
      <div
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, 2)}
      >
        <span className="task-header">COMPLETED</span>
        {numberDos}
      </div>

    </div>
  );
};

export default ProcedureList2;
