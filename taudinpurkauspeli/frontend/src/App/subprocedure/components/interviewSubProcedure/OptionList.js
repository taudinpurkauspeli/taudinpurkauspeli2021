import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Option from './Option';

const OptionList = ({ optionGroupSubProcedureId }) => {
  const caseOptions = useSelector((state) => state.optionsUnderSubProcedure);
  const options = caseOptions.filter(
    (o) => o.optionGroupSubProcedureId === optionGroupSubProcedureId,
  );

  return (
    <Accordion>
      {options.map((o) => (
        <Option
          key={o.id}
          id={o.id}
          name={o.name}
          description={o.description}
          isRequired={o.isRequired}
        />
      ))}
    </Accordion>
  );
};

export default OptionList;
