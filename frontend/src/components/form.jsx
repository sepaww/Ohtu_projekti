/* eslint-disable react/prop-types */
import { Form, Stack, Button, Container, Collapse} from "react-bootstrap";
import refservice from "../Services/Refservice";
import {useState } from "react";
import fields from "./data/fiels.json"
import Inputfield from "./inputfield";
import TypeSelect from "./typeselect";

const resetFormValues = (entryTypes, refType) => {
  const types = entryTypes[refType].reduce((a, k) => ({...a, [k]: ""}), {})
  return({type: refType, ...types})
}

const RefForm = ({setRefs, refs, entryTypes, setAlert}) => {
  const [refType, setRefType] = useState("")
  const [formValues, setFormValues] = useState({})
  const [validated, setValidated] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [citeKey, setCiteKey] = useState("")
  
  const minimize = () => {
    setOpen(false)
    setTimeout(() => {
      setValidated(false)
      setRefType("")
    }, 50)
  }
  const maximize = (type) => {
    setOpen(true)
    setRefType(type)
    setFormValues(resetFormValues(entryTypes, type)) 
  }
  const handleTypeChange = e => {
    e.preventDefault()
    e.target.checkValidity()
    const type = e.target.value
    type !== "" ? maximize(type) : minimize(type)
  
  }

  const handleSubmit =  async(event)   => {
      event.preventDefault()
      const form = event.target
      if (form.checkValidity()) {
        try{
          const data = await refservice.postNew(formValues)
          setRefs(refs.concat(data))
          setAlert({text: "New citation has been added.", variant: "success"})
          minimize()
        } 
        catch(error){
          setAlert({text: `Error: ${error.message}`, variant: "danger"})
        }
      } else {
        setValidated(true)
      }
    }
    console.log(formValues)
    return (
      <Container className="border rounded my-1"> 
        <Form noValidate method="post" onSubmit={handleSubmit} validated={validated} > 
          <Stack className="col-md-8 mx-auto py-2">
          <TypeSelect
          setFormValues={setFormValues}
          formValues={formValues}
          handleTypeChange={handleTypeChange}
          refType={refType}
          entryTypes={entryTypes}
          citeKey={citeKey}
          setCiteKey={setCiteKey}
          />
            <Collapse in={isOpen}> 
              <div> 
             {refType &&
            entryTypes[refType].map((input) => 
              <Inputfield 
                key={input}
                input={fields.find(o => o.name === input)}
                inputValue={formValues[input]}
                setInputValue={v => setFormValues({...formValues, [input]: v})} 
              /> )}
              </div>
            </Collapse>
          </Stack>
          <div className="d-grid col-8 mx-auto m-2" >
          {
          refType ?
          <Button type="submit">Submit Reference</Button> : 
          <Button disabled type="submit">Select to Submit</Button>
          }
          </div>
        </Form>
      </Container>
    )
}

export default RefForm