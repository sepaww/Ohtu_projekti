import { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import Reftable from './components/reftable'
import refservice from './Services/Refservice'
function App () {
  const [refs, setRefs] = useState([])
  useEffect(() =>  {
    refservice.getAll()
    .then((data) => setRefs(data)
    )}, [])
  return (
    <Container className='lg px-2'> 
      <Mainbar/>
      <RefForm setRefs={setRefs} refs={refs}/>
      <Reftable references={refs}/>
    </Container>
  )
}

export default App
