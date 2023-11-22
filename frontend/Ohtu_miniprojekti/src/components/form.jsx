import { useState } from "react";
import { Form, InputGroup, Stack} from "react-bootstrap";

const RefForm = () => {
    const [Title, setTitle] = useState("")
    return(
        <Form> 
            <Stack className="col-md-5 mx-left" gap="3">
            <InputGroup size="sm" className="mb-2">
                <InputGroup.Text id="inputGroup-sizing-sm"> Title</InputGroup.Text>
                <Form.Control
                  placeholder='Example Blog'
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-2"></InputGroup>
              </Stack>
        </Form>
    )
}

export default RefForm