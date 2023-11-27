/* eslint-disable react/prop-types */
import { Form, InputGroup, Stack, Button} from "react-bootstrap";
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
const Typeselect = ({setRefType}) => {
  const types = ["Book", "Article", "Booklet", "MasterThesis"]
  // this prevents a bug if you choose select type to start again 
  const setTypeCorrect = (target) => {
    if (target === "reset") {
      setRefType(null)
    }
    else {
      setRefType(target)
    }
  }
  return(
  <div> 
    <Form.Select aria-label="Ref type select" name="type" size="lg" className="m-2" onChange={(e) => setTypeCorrect(e.target.value)}>
      <option value={"reset"}> Select Type to start</option>
      {types.map((t) => <option value={t} key={t}>{t}</option>)}
    </Form.Select>
  </div>)
}

const RefForm = ({setRefs, refs}) => {
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
      {name: "title", placeholder:"Example Title"}, 
      {name: "author", placeholder:"Example Author"}, 
      {name: "journal", placeholder:"Journal Name"},
      {name: "year", placeholder: "Year published"},
      {name: "volume", placeholder: ""},
      {name: "number", placeholder: "6"},
      {name: "pages", placeholder: "111-222 or 111,222"},
      {name: "publisher", placeholder: "WSOY AB"},
      {name: "adress", placeholder: "Mannerheimintie 1"},
      {name: "howpubluihsed", placeholder: "Distributed in unicafe"}, 
      {name: "Month", placeholder: "Jan"},
      {name: "School", placeholder: "Uni Of Helsingi"}
    ]
    const inputs = {
      Book: [fields[1], fields[0],fields[7],fields[8], fields[3]], 
      Article: [fields[0], fields[1], fields[2], fields[3],fields[5],fields[6]],
      Booklet: [fields[0], fields[1],fields[9], fields[10], fields[6]],
      MasterThesis: [fields[0], fields[1],fields[11], fields[6], fields[7], fields[10]]
      }
    console.log(reftype)

    return (
      
        <Form method="post" onSubmit={handleSubmit}> 
        <Typeselect setRefType={setRefType}/>
            <Stack className="col-md-6" gap="3">
              {
              reftype ? 
              inputs[reftype].map((input) => <Inputfield key={input.name} input={input}> </Inputfield>) : 
              <h5> Start by selecting ref type</h5>
              }
            </Stack>
            {
            reftype? 
            <Button type="submit">Submit Reference</Button> : 
            <Button disabled type="submit">Select to Submit</Button>
            }

        </Form>
    )
}

export default RefForm