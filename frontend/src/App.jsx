import { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import refservice from './Services/refservice'
function App () {
  const [refs, setRefs] = useState([])
  useEffect(() =>  {
    refservice.getAll()
    .then((data) => setRefs(data)
    )}, [])
  console.log(refs)
  return (
    <Container className='lg px-2'> 
      <Mainbar/>
      <RefForm setRefs={setRefs} refs={refs}/>
      { refs.map((d) => <div key={d.Title} ><h6> Reference </h6>  Title: {d.Title} Author: {d.Author} </div>)}
    </Container>
  )
}

export default App
