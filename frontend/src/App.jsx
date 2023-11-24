import { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import refservice from './Services/Refservice'
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
      { refs.map((d) => <div key={d.title} ><h6> Reference </h6>  Title: {d.title} Author: {d.author} </div>)}
    </Container>
  )
}

export default App
