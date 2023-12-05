import { Button, Modal } from 'react-bootstrap';
import refservice from '../Services/Refservice';

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
            <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete <b>{toBeDeleted}</b>?</Modal.Body>
        <Modal.Footer>
            <Button id="dialog-cancel" variant="secondary" onClick={() => setToBeDeleted("")}>
            Cancel
            </Button>
            <Button id="dialog-delete" variant="primary" onClick={handleDelete}>
            Delete
            </Button>
        </Modal.Footer>
    </Modal>
  );
}