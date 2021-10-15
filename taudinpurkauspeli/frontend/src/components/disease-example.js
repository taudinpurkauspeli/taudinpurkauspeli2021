/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

// Example for testing
const DiseaseExample = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important';

  return (
    <li className="disease">
      {note.content}
      <button type="button" onClick={toggleImportance}>{label}</button>
    </li>
  );
};
DiseaseExample.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    important: PropTypes.bool,
  }),
  toggleImportance: PropTypes.func,
};

export default DiseaseExample;
