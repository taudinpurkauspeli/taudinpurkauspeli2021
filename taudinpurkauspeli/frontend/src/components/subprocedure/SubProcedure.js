/* eslint-disable linebreak-style */
import React from 'react';
import TextSubProcedure from './TextSubProcedure';

// eslint-disable-next-line consistent-return
const SubProcedure = ({ d }) => {
  if (d.type === 'TEXT') {
    return (
      <TextSubProcedure
        id={d.id}
        title={d.textSubProcedures.title}
        text={d.textSubProcedures.text}
      />
    );
  }
};

export default SubProcedure;