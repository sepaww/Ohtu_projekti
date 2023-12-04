/* eslint-disable react/prop-types */
import { Form, InputGroup, Stack, Button, Container} from "react-bootstrap";
import refservice from "../Services/Refservice";
import { useState } from "react";

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
const Typeselect = ({setRefType, entryTypes}) => {
  // this prevents a bug if you choose select type to start again 
  const setTypeCorrect = (target) => target === "reset" ? setRefType(null) : setRefType(target)
    return(
        <div> 
          <Form.Select aria-label="Ref type select" name="type" size="lg" className="m-2" onChange={(e) => setTypeCorrect(e.target.value)}>
            <option value={"reset"}> Select Type to start</option>
            {entryTypes.map((t) => <option value={t} key={t}>{t}</option>)}
          </Form.Select>
        </div>
    )
  }

const RefForm = ({setRefs, refs, entryTypes}) => {
    const [reftype, setRefType] = useState(false)
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
    const fields = [
      {name: "citekey", placeholder:"\\cite{key}"},
      {name: "title", placeholder:"Example Title"}, 
      {name: "author", placeholder:"Example Author"}, 
      {name: "journal", placeholder:"Journal Name"},
      {name: "year", placeholder: "Year published"},
      {name: "volume", placeholder: ""},
      {name: "number", placeholder: "6"},
      {name: "pages", placeholder: "111-222 or 111,222"},
      {name: "publisher", placeholder: "WSOY AB"},
      {name: "adress", placeholder: "Mannerheimintie 1"},
      {name: "howpublished", placeholder: "Distributed in unicafe"}, 
      {name: "Month", placeholder: "Jan"},
      {name: "School", placeholder: "Uni Of Helsingi"}
    ]

    return (
      <Container className="px-2"> 
        <Form method="post" onSubmit={handleSubmit}> 
        <Typeselect setRefType={setRefType} entryTypes={Object.keys(entryTypes)}/>
            <Stack gap="2">
              {
              reftype ? 
              entryTypes[reftype].map((input) => <Inputfield key={input} input={fields.find(o => o.name === input)}> </Inputfield>) : 
              <h5> Start by selecting ref type</h5>
              }
            </Stack>
            {
            reftype? 
            <Button type="submit">Submit Reference</Button> : 
            <Button disabled type="submit">Select to Submit</Button>
            }

        </Form>
      </Container>
    )
}

export default RefForm