import React from 'react';
import { useParams } from 'react-router-dom';

const Case = ({ cases }) => {
  const { id } = useParams();
  const c = cases.find((a) => a.id === Number(id));

  return (
    <div id="wrapper">
      <h2>{c.title}</h2>
      <p>{c.anamnesis}</p>
    </div>
  );
};

export default Case;
