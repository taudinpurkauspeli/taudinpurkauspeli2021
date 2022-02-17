/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector } from 'react-redux';

const SelectDifferentialForm = ({ selectDifferential, diffGroupCaseId }) => {
  const { t } = useTranslation();

  const [selectedDiff, setSelectedDiff] = useState([]);
  const [description, setDescription] = useState('');
  const differentials = useSelector((state) => state.differentials);

  const handleDifferentialChoose = (event) => {
    event.preventDefault();
    const differential = differentials.filter((d) => d.name === selectedDiff[0])[0];
    selectDifferential({
      diffGroupCaseId,
      differentialId: differential.id,
      description,
    });

    setDescription('');
    setSelectedDiff([]);
  };

  return (
    <Form onSubmit={handleDifferentialChoose}>
      <Form.Group>
        <Form.Label>{t('selectExistingDifferential')}</Form.Label>
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          options={differentials.map((d) => d.name)}
          placeholder={t('selectDifferential')}
          onChange={setSelectedDiff}
          selected={selectedDiff}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>{t('description')}</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button className="submitButton" type="submit">{t('buttonSubmitNewDifferential')}</Button>
    </Form>
  );
};

export default SelectDifferentialForm;