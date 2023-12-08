import { Form, Button } from 'react-bootstrap'
import refservice from '../Services/Refservice'

export default function Download() {
    const handleSubmit = async (event) => {
        event.preventDefault()
        refservice.download()
    }

    return (
            <Form onSubmit={handleSubmit} className="d-flex">
                        <Form.Label column sm={7} className='px-1'>
                            Export to:
                        </Form.Label>
                <Button id="export" variant="dark" type="submit">
                    <img src="/BibTeX_logo.png" style={{ height: "1em" }}/>
                </Button>
            </Form>
    )
}