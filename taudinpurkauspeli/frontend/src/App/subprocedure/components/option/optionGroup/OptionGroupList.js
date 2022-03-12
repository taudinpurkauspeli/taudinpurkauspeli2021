import React from 'react';
import { useSelector } from 'react-redux';
import OptionGroup from './OptionGroup';

const OptionGroupList = ({ subProcedureId, admin }) => {
  const caseOptionGroups = useSelector((state) => state.optionGroupsUnderSubProcedure);
  const subProcedureOptionGroups = caseOptionGroups.filter(
    (o) => o.subProcedureId === subProcedureId,
  );

  return (
    <div data-testid="optionGroupList">
      {subProcedureOptionGroups.map((d) => (
        <OptionGroup
          key={d.id}
          optionGroupSubProcedureId={d.optionGroupSubProcedureId}
          name={d.name}
          admin={admin}
        />
      ))}
    </div>
  );
};

export default OptionGroupList;
