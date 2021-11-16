/* eslint-disable array-callback-return */
import React, { useState, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button, Modal, Tabs, Tab,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import service from '../../services/differentials';

const NewDifferential = React.forwardRef(({ addDifferential, chooseDifferential, caseId }, ref) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [differentials, setDifferentials] = useState([]);
  const [newDifferential, setNewDifferential] = useState('');
  const [selectedDiff, setSelectedDiff] = useState([]);
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    service.getAll()
      .then((initialDifferentials) => {
        setDifferentials(initialDifferentials);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const newDifferentialSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    description: Yup.string(),
  });

  const handleDifferentialAdd = (values) => {
    addDifferential({
      name: values.name,
      description: values.description,
    });

    setNewDifferential('');
    setDescription('');
  };

  const handleDifferentialChoose = (event) => {
    event.preventDefault();
    const differential = differentials.filter((d) => d.name === selectedDiff[0])[0];
    chooseDifferential({
      caseId,
      differentialId: differential.id,
      description,
    });

    setNewDifferential('');
    setDescription('');
  };

  const toggleVisibility = () => setShow(!show);

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <Button variant="primary" onClick={toggleVisibility}>
        {t('buttonNewDifferential')}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('addDifferential')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="select" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="select" title={t('selectExisting')}>
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
                <Button type="submit">{t('buttonSubmitNewDifferential')}</Button>
              </Form>
            </Tab>
            <Tab eventKey="add" title={t('addNewDifferential2')}>
              <Formik
                initialValues={{
                  name: newDifferential,
                  description: '',
                }}
                validationSchema={newDifferentialSchema}
                onSubmit={handleDifferentialAdd}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group md="6" controlId="name">
                      <Form.Label>{t('addDifferential')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder={t('write')}
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>{t('description')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button type="submit">{t('buttonSubmitNewDifferential')}</Button>
                  </Form>
                )}
              </Formik>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default NewDifferential;
