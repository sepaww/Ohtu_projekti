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
      <RefForm/>
      { refs.map((d) => <div key={d.title} ><h6> Reference </h6>  Title: {d.title} Author: {d.author} </div>)}
    </Container>
  )
}

export default App
