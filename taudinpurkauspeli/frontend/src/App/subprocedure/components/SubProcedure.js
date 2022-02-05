/* eslint-disable linebreak-style */
import React from 'react';
import TextSubProcedure from './textSubProcedure/TextSubProcedure';

// eslint-disable-next-line consistent-return
const SubProcedure = ({ d, admin }) => {
  if (d.type === 'TEXT') {
    return (
      <TextSubProcedure
        id={d.id}
        title={d.title}
        text={d.text}
        admin={admin}
      />
    );
  }
};

export default SubProcedure;
