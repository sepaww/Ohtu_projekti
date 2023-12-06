/* eslint-disable react/prop-types */
import { Form, Button, Container } from 'react-bootstrap'
import refservice from '../Services/Refservice'

export default function Download() {
    const handleSubmit = async (event) => {
        event.preventDefault()
        refservice.download()
    }

    return (
        <Container className="p-2">
            <Form onSubmit={handleSubmit} text-right>
                <Button id="export" variant="dark" type="submit" className='float-right'>
                    <img src="/BibTeX_logo.png" style={{ height: "1em" }}/>
                </Button>
            </Form>
        </Container>
    )
}