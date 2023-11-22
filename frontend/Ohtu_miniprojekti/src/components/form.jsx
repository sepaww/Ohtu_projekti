/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, InputGroup, Stack} from "react-bootstrap";

const RefForm = () => {
    const [Formdata, setForm] = useState("")
    const forms = [{id: "001", type: "Title"}]

    return (
        <Form> 
            <Stack className="col-md-5 mx-left" gap="3">
                <InputGroup size="sm" className="mb-2">
                <InputGroup.Text id="inputGroup-sizing-sm"> Title</InputGroup.Text>
                <Form.Control
                  placeholder='Example Blog'
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={({ target }) => setForm(target.value)}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-2"></InputGroup>
            </Stack>
        </Form>
    )
}

export default RefForm