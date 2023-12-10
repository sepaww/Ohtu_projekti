/* eslint-disable react/prop-types */
import { Form, Stack, Button, Container, Collapse} from "react-bootstrap";
import refservice from "../Services/Refservice";
import { useState } from "react";
import fields from "./data/fiels.json"
import Inputfield from "./inputfield";

const TypeSelect = ({ refType, setRefType, setFormValues, entryTypes }) => {
  const handleChange = e => {
    setRefType(e.target.value)
    refType && setFormValues(entryTypes[refType].reduce((a, k) => ({...a, [k]: ""}), {}))  
  }

  return(
      <div> 
        <Form.Select 
          aria-label="Ref type select"
          name="type"
          size="lg"
          className="m-2"
          value={refType}
          onChange={handleChange}>
            <option value={""}>Select Type to start</option>
            {Object.keys(entryTypes).map((t) => <option value={t} key={t}>{t}</option>)}
        </Form.Select>
      </div>
  )
}

const RefForm = ({setRefs, refs, entryTypes, setAlert}) => {
    const [refType, setRefType] = useState("")
    const [formValues, setFormValues] = useState({})
    const [validated, setValidated] = useState(false);

    const handleSubmit =  async(event)   => {
      event.preventDefault()
      const form = event.target
      if (form.checkValidity()) {
        try{
          const formData = new FormData(form)
          const formJson = Object.fromEntries(formData.entries());
          const data = await refservice.postNew(formJson)
          setRefs(refs.concat(data))
          setValidated(false)
          setAlert({text: "New citation has been added.", variant: "success"})
          setFormValues(entryTypes[refType].reduce((a, k) => ({...a, [k]: ""}), {}))
        } catch(error){
          setAlert({text: `Error: ${error.message}`, variant: "danger"})
        }
      } else {
        setValidated(true)
      }
    }

    return (
      <Container className="px-2"> 
        <Form noValidate method="post" onSubmit={handleSubmit} validated={validated}> 
          <TypeSelect refType={refType} setRefType={setRefType} setFormValues={setFormValues} entryTypes={entryTypes}/>
          <Collapse in={refType}> 
          <Stack gap="2">
            { 
            refType && entryTypes[refType].map((input) => 
              <Inputfield 
                key={input}
                input={fields.find(o => o.name === input)}
                inputValue={formValues[input]}
                setInputValue={v => setFormValues({...formValues, [input]: v})} /> )}
          </Stack>
          </Collapse>
          {
          refType ?
          <Button type="submit">Submit Reference</Button> : 
          <Button disabled type="submit">Select to Submit</Button>
          }
        </Form>
      </Container>
    )
}

export default RefForm