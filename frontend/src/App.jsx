import { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import Reftable from './components/reftable'
import refservice from './Services/Refservice'
function App () {
  const [refs, setRefs] = useState([])
  const [entryTypes, setEntryTypes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() =>  {
    refservice.getAll()
    .then((data) => {
      setRefs(data.refs);
      setEntryTypes(data.form);
      setLoading(false)
    })
  }, [])
  if (loading) return(<h1> loading </h1>)
  return (
    <Container className='lg px-0'> 
      <Mainbar/>
      <RefForm setRefs={setRefs} refs={refs} entryTypes={entryTypes}/>
      <Reftable refs={refs} setRefs={setRefs}/>
    </Container>
  )
}

export default App
