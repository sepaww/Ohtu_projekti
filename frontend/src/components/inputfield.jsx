/* eslint-disable react/prop-types */
import { useState } from "react"
import { InputGroup, Form } from "react-bootstrap"
import pattern from "../Services/Validating"

const Inputfield = ({ input, inputValue, setInputValue }) => {
    const [feedback, setFeedback] = useState("")
    if (input.name === "citekey") {
      return // dirty hack :)
    } 
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
         <InputGroup hasValidation size="sm" className={`mb-2 my-3 ${inputValue && "was-validated"}`}>
              <InputGroup.Text id="inputGroup-sizing-sm" style={{ textTransform: 'capitalize' }} className="col-2 mx-auto">
                <div className="mx-auto"> {input.name}</div>
              </InputGroup.Text>
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

export default Inputfield