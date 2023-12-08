/* eslint-disable react/prop-types */
import { Form, InputGroup, Stack, Button, Container} from "react-bootstrap";
import refservice from "../Services/Refservice";
import { useState } from "react";

function pattern(field) {
  switch(field) {
    case "author": {
      const part = /\b(?!and\s*)[\w\}\{\\'"\-ÄäÖöÅå]+\.?,?/ //eslint-disable-line
      const name = `${part.source}( ${part.source}){1,4}`
      const author = `^${name}( and ${name})*$`
      return author
    }
    case "year": {
      const year = /^\D*\d{1,4}(\D+\d{1,4})*\D*$/
      return year.source
    }
    default:
      return ".+"
  }
}

const Inputfield = ({ input, inputValue, setInputValue }) => {
  const [feedback, setFeedback] = useState("")

  const handleChange = e => {
    setInputValue(e.target.value)
    e.target.checkValidity() // if invalid will trigger invalid event
  }

  const handleInvalid = e => {
    const validity = e.target.validity
    if (validity.valueMissing) {
      setFeedback("required field")
    } else if (validity.patternMismatch) {
      setFeedback(input.feedback)
    }
  }

  return(
    <div> 
       <InputGroup hasValidation size="sm" className={`mb-2 ${inputValue && "was-validated"}`}>
            <InputGroup.Text id="inputGroup-sizing-sm" style={{ textTransform: 'capitalize' }}>{input.name}</InputGroup.Text>
            <Form.Control
              placeholder={input.placeholder}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name={input.name}
              value={inputValue}
              onChange={handleChange}
              onInvalid={handleInvalid}
              pattern={pattern(input.name)}
              required
            />
            <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
        </InputGroup>
    </div>
  )
}

const TypeSelect = ({ refType, handleTypeChange, entryTypes }) => {
  return(
      <div> 
        <Form.Select 
          aria-label="Ref type select"
          name="type"
          size="lg"
          className="m-2"
          value={refType}
          onChange={handleTypeChange}
        >
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
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries());

        try{
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

    const handleTypeChange = e => {
      setRefType(e.target.value)
      setValidated(false)
      if (refType) {
        setFormValues(entryTypes[refType].reduce((a, k) => ({...a, [k]: ""}), {}))
      }
    }

    const fields = [
      {name: "citekey", placeholder:"\\cite{key}"},
      {name: "title", placeholder:"Example Title"}, 
      {name: "author", placeholder:"Example Author", feedback: "author should be ' and ' delimited list of names with 2-5 parts"}, 
      {name: "journal", placeholder:"Journal Name"},
      {name: "booktitle", placeholder: "20th Annual Conference on Bro Science"},
      {name: "year", placeholder: "Year published", feedback: "year should contain one or more 1-4-digit numbers"},
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
        <Form noValidate method="post" onSubmit={handleSubmit} validated={validated}> 
          <TypeSelect refType={refType} handleTypeChange={handleTypeChange} entryTypes={entryTypes}/>
          <Stack gap="2">
            {
            refType ? entryTypes[refType].map((input) => 
            <Inputfield 
              key={input}
              input={fields.find(o => o.name === input)}
              inputValue={formValues[input]}
              setInputValue={v => setFormValues({...formValues, [input]: v})}
            />
            ) :
            <h5>Start by selecting ref type</h5>
            }
          </Stack>
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