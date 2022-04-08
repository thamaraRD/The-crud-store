import React from 'react'
import { Button, Modal } from 'react-bootstrap';


const ModalComponent = ({children, handleClose, show}) => {
    return (
    
      <Modal show={show} onHide={handleClose} className='mt-5'>
        <Modal.Header>
          <Modal.Title>Detalle del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  export default ModalComponent;

