import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Mainbar from './components/navigation'
import RefForm from './components/form'
import { getAll } from './Services/Refservice'

function App() {
  
  const data = getAll()
  console.log(data)
  return (
    <Container className='lg'> 
      <Mainbar/>
      <RefForm/>
    </Container>
  )
}

export default App
