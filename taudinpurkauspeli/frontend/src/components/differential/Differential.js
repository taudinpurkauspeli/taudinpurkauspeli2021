/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Button, Modal, Tabs, Tab, Accordion, Card, Alert,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import service from '../../services/differentials';
import serviceUnderCases from '../../services/differentialsUnderCases';

const Differential = ({ admin, addDifferentialFunc, caseId }) => {
  const { t } = useTranslation();

  const [newDifferential, setNewDifferential] = useState('');
  const [show, setShow] = useState(false);
  const [differentials, setDifferentials] = useState([]);
  const [caseDifferentials, setCaseDifferentials] = useState([]);
  const [selectedDiff, setSelectedDiff] = useState([]);
  const [description, setDescription] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  React.useEffect(() => {
    serviceUnderCases.getAll(caseId)
      .then((initialDifferentials) => {
        setCaseDifferentials(initialDifferentials);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });

    service.getAll()
      .then((initialDifferentials) => {
        setDifferentials(initialDifferentials);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }, []);

  const newDfferentialSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('warningShort'))
      .max(999, t('warningLong'))
      .required(t('warningRequired')),
    description: Yup.string(),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSuccess = () => {
    setNewDifferential('');
    setShow(false);
    setAlertMessage(t('differentialUpdateSuccess'));
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    setNewDifferential('');
    setShow(false);
    setErrorMessage(t('differentialUpdateError'));
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleDifferentialAdd = (values) => {
    const differentialObject = ({
      name: values.name,
    });

    if (addDifferentialFunc !== undefined) {
      addDifferentialFunc(differentialObject);
    } else {
      service.create(differentialObject)
        .then((res) => {
          const differentialId = res[0].id;
          const ducObject = {
            caseId,
            differentialId,
            description: values.description,
          };
          serviceUnderCases.create(ducObject)
            .then(() => handleSuccess())
            .catch((error) => handleError(error));
        });
    }
  };

  const handleDifferentialChoose = (event) => {
    event.preventDefault();
    const differential = differentials.filter((d) => d.name === selectedDiff[0])[0];
    const ducObject = {
      caseId,
      differentialId: differential.id,
      description,
    };

    if (addDifferentialFunc !== undefined) {
      addDifferentialFunc(ducObject);
    } else {
      serviceUnderCases.create(ducObject)
        .then(() => handleSuccess())
        .catch((error) => handleError(error));
    }
  };

  return (
    <div>
      {admin && (
        <div>
          { alertMessage !== null && (
          <Alert variant="success">{alertMessage}</Alert>
          )}
          { errorMessage !== null && (
          <Alert variant="danger">{errorMessage}</Alert>
          )}
          <Button variant="primary" onClick={handleShow}>
            {t('buttonNewDifferential')}
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{t('handleDifferentialAdd')}</Modal.Title>
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
                    validationSchema={newDfferentialSchema}
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
                          <Form.Label>{t('handleDifferentialAdd')}</Form.Label>
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
      )}

      <Accordion>
        {caseDifferentials.map((d) => (
          <Card key={d.id}>
            <Accordion.Toggle as={Card.Header} eventKey={d.id}>
              {d.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={d.id}>
              <Card.Body>{d.description}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default Differential;
