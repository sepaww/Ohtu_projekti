import { useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import TimedAlert from './components/timedalert'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import Reftable from './components/reftable'
import refservice from './Services/Refservice'
import Footer from './components/footer'


export default function App () {
  const [refs, setRefs] = useState([])
  const [entryTypes, setEntryTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({text: "", variant: "boot"})

  useEffect(() =>  {
    refservice.getAll()
    .then((data) => {
      setRefs(data.refs);
      setEntryTypes(data.form);
      setLoading(false)
    })
  }, [])

  if (loading) return (<h1> loading </h1>)

  return (
    <Container className='container-fluid position-relative d-flex flex-column min-vh-100'> 
      <Mainbar/>
      <TimedAlert msg={alert}/>
      <RefForm setRefs={setRefs} refs={refs} entryTypes={entryTypes} setAlert={setAlert}/>
      <Reftable refs={refs} setRefs={setRefs} setAlert={setAlert}/>
      <Footer className="fixed-bottom"/>
    </Container>
    

  )
}
