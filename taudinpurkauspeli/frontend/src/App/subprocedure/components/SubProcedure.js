import React from 'react';
import InterviewSubProcedure from './interviewSubProcedure/InterviewSubProcedure';
import TextSubProcedure from './textSubProcedure/TextSubProcedure';
import ConclusionSubProcedure from './conclusionSubProcedure/ConclusionSubProcedure';

// eslint-disable-next-line consistent-return
const SubProcedure = ({ d, admin }) => {
  if (d.type === 'TEXT') {
    return (
      <TextSubProcedure
        d={d}
        admin={admin}
      />
    );
  } if (d.type === 'INTERVIEW') {
    return (
      <InterviewSubProcedure
        d={d}
        admin={admin}
      />
    );
  } if (d.type === 'CONCLUSION') {
    return (
      <ConclusionSubProcedure
        d={d}
        admin={admin}
      />
    );
  }
};

export default SubProcedure;
