/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';
import refservice from '../Services/Refservice';
import { Trash3, ExclamationTriangle } from 'react-bootstrap-icons'


export default function DeleteModal({toBeDeleted, setToBeDeleted, refs, setRefs, setAlert}) {
    const handleDelete = async () => {
        const response = await refservice.deleteRef(toBeDeleted)
        const newRefs = refs.filter((r) => r.citekey !== toBeDeleted)
        
        if (response.status === 204) {
            setRefs(newRefs)
            setAlert({text: `Deleted ${toBeDeleted} successfully.`, variant: "success"})
        } else if (response.status === 500) {
            setAlert({text: `Failed to delete ${toBeDeleted}.`, variant: "warning"})
        }
        setToBeDeleted("")
    }

  return (
    <Modal show={toBeDeleted !== ""}>
        <Modal.Header>
            <Modal.Title>
                Warning <ExclamationTriangle className='mx-auto m-1'/>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete <b>{toBeDeleted}</b>?</Modal.Body>
        <Modal.Footer>
            <Button id="dialog-cancel" variant="secondary" onClick={() => setToBeDeleted("")}>
            Cancel
            </Button>
            <Button id="dialog-delete" variant="primary" onClick={handleDelete} className='icon-link'>
              Delete <Trash3> </Trash3>
            </Button>
        </Modal.Footer>
    </Modal>
  );
}