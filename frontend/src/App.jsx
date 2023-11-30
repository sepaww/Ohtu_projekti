import { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import Reftable from './components/reftable'
import refservice from './Services/Refservice'
function App () {
  const [refs, setRefs] = useState([])
  const [entryTypes, setEntryTypes] = useState([])
  useEffect(() =>  {
    refservice.getAll()
    .then((data) => {
      setRefs(data.refs);
      setEntryTypes(data.form);
    })
  }, [])
  return (
    <Container className='lg px-2'> 
      <Mainbar/>
      <RefForm setRefs={setRefs} refs={refs} entryTypes={entryTypes}/>
      <Reftable refs={refs} setRefs={setRefs}/>
    </Container>
  )
}

export default App
