/* eslint-disable linebreak-style */
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';

const AddUpdateModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow(!show);

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <Button className="addButton text" onClick={toggleVisibility} size="sm">
        {props.buttonLabel}
      </Button>
      <Modal
        show={show}
        onHide={toggleVisibility}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.titleLabel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default AddUpdateModal;
