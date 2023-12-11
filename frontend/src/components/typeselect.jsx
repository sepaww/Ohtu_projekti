/* eslint-disable react/prop-types */
import { useState } from "react"
import { Container, Stack, InputGroup, Form, Button } from "react-bootstrap"
import pattern from "../Services/Validating"
import generateKey from "../utils/Generatecitekey";


const TypeSelect = ({refType, handleTypeChange, entryTypes, setFormValues, formValues, citeKey, setCiteKey}) => {
    const [feedback, setFeedback] = useState("")
    const [isGenerateDisabled, setIsGeneratedDisabled] = useState(true)
    const handleCitekeyChange = e => {
      setCiteKey(e.target.value)
      setFormValues({...formValues, citekey: e.target.value})
    }

    const setGenrdCiteKey = () => {
        const citekey = generateKey(formValues)
        setCiteKey(citekey)
        setFormValues({...formValues, citekey: citekey})
    }
    if (formValues.author && formValues.year){
        isGenerateDisabled && setIsGeneratedDisabled(false)
    }
    const handleInvalid = e => {
      const validity = e.target.validity
      if (validity.valueMissing) {
        setFeedback("required field")
      }
    }
    return(
      <Container className="my-2 py-3 border rounded bg-light">
        <Stack direction='horizontal' gap={3}> 
          <Form.Select 
            aria-label="Ref type select"
            name="type"
            value={refType}
            onChange={handleTypeChange}
            className="me-auto col-0 w-50">
              <option value={""}>Select Type to start</option>
              {Object.keys(entryTypes).map((t) => <option value={t} key={t}>{t}</option>)}
          </Form.Select>
          <div className="vr" />
          <InputGroup className="me-auto"> 
          <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
              <Form.Control
                  value={citeKey}
                  onChange={e => handleCitekeyChange(e)}
                  onInvalid={handleInvalid}
                  pattern={pattern("citekey")}
                  required
                  id='citekey'
                  name='citekey'
                  placeholder='add a citekey'
                  aria-label='Set Citekey'
                />
                <Button disabled={isGenerateDisabled} id='generate-citekey' variant='secondary' onClick={setGenrdCiteKey}> 
                  Generate
                </Button>
            </InputGroup>
          </Stack>
        </Container>
      )}

      export default TypeSelect