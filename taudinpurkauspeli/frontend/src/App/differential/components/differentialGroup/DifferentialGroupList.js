/* eslint-disable linebreak-style */
import React from 'react';
import { useSelector } from 'react-redux';
import DifferentialGroup from './DifferentialGroup';

const DifferentialGroupList = ({ admin }) => {
  const caseDifferentialGroups = useSelector((state) => state.differentialGroupsUnderCase);

  return (
    <div data-testid="diffGroupList">
      {caseDifferentialGroups.map((d) => (
        <DifferentialGroup
          key={d.id}
          diffGroupCaseId={d.diffGroupCaseId}
          name={d.name}
          admin={admin}
        />
      ))}
    </div>
  );
};

export default DifferentialGroupList;
