/* eslint-disable react/prop-types */
import { Form, InputGroup, Stack, Button} from "react-bootstrap";
import refservice from "../Services/refservice";

const Inputfield = ({ input }) => {
  return(
    <div> 
       <InputGroup size="sm" className="mb-2">
            <InputGroup.Text id="inputGroup-sizing-sm"> {input.type}</InputGroup.Text>
            <Form.Control
              placeholder={input.text}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name={input.type}
            />
          </InputGroup>
        <InputGroup size="sm" className="mb-2"></InputGroup>
    </div>
  )
}
const Typeselect = () => {
  const types = ["Book", "Journal", "Article"]
  return(
  <div> 
    <Form.Select aria-label="Default select example" name="type">
      {types.map((t) => <option value={t} key={t}>{t}</option>)}
    </Form.Select>
  </div>)
}

const RefForm = ({setRefs, refs}) => {
    const handleSubmit =  async(event)   => {
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      const formJson = Object.fromEntries(formData.entries());
      const response = await refservice.postNew(formJson)
      if (response.status === 204) {
        setRefs(refs.concat(formJson))
      }
  

    }
    const inputs = [
          {type: "Title", text:"Example Title"}, 
          {type: "Author", text:"Example Author"}, 
          {type: "Journal", text:"Journal Name"}
        ]
    
    return (
        <Form method="post" onSubmit={handleSubmit}> 
            <Stack className="col-md-5 mx-left" gap="3">
              {inputs.map((input) => <Inputfield key={input.type} input={input}> </Inputfield>)}
            <Typeselect/>
            </Stack>
            <Button type="submit">Submit Reference</Button>

        </Form>
    )
}

export default RefForm