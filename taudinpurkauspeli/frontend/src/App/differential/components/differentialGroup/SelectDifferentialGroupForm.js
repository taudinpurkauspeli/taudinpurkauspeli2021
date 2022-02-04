/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector } from 'react-redux';

const SelectDifferentialGroupForm = ({ selectDifferentialGroup }) => {
  const { t } = useTranslation();

  const [selectedDiff, setSelectedDiff] = useState([]);
  const differentialGroups = useSelector((state) => state.differentialGroups);

  const handleDifferentialChoose = (event) => {
    event.preventDefault();
    const differentialGroup = differentialGroups.filter((d) => d.name === selectedDiff[0])[0];
    selectDifferentialGroup(differentialGroup.id);
    setSelectedDiff([]);
  };

  return (
    <Form onSubmit={handleDifferentialChoose}>
      <Form.Group>
        <Form.Label>{t('selectExistingDifferentialGroup')}</Form.Label>
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          options={differentialGroups.map((d) => d.name)}
          placeholder={t('selectDifferentialGroup')}
          onChange={setSelectedDiff}
          selected={selectedDiff}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferentialGroup')}</Button>
    </Form>
  );
};

export default SelectDifferentialGroupForm;
