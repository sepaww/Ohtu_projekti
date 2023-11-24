/* eslint-disable react/prop-types */
import { Form, InputGroup, Stack, Button} from "react-bootstrap";
import refservice from "../Services/Refservice";

const Inputfield = ({ input }) => {
  return(
    <div> 
       <InputGroup size="sm" className="mb-2">
            <InputGroup.Text id="inputGroup-sizing-sm" style={{ textTransform: 'capitalize' }}>{input.name}</InputGroup.Text>
            <Form.Control
              placeholder={input.placeholder}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name={input.name}
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
      if (response.status === 201) {
        setRefs(refs.concat(formJson))
      }
  

    }
    const inputs = [
          {name: "title", placeholder:"Example Title"}, 
          {name: "author", placeholder:"Example Author"}, 
          {name: "journal", placeholder:"Journal Name"}
        ]
    
    return (
        <Form method="post" onSubmit={handleSubmit}> 
            <Stack className="col-md-5 mx-left" gap="3">
              {inputs.map((input) => <Inputfield key={input.name} input={input}> </Inputfield>)}
            <Typeselect/>
            </Stack>
            <Button type="submit">Submit Reference</Button>

        </Form>
    )
}

export default RefForm