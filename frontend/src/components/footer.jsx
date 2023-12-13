import { Container, Stack } from "react-bootstrap"

const Footer = () => {
    return (
      <Container className='bg-light border border-1 rounded px-3 py-2 my-1 mt-auto'> 
        <div className="py-2 ">
        <Stack direction="horizontal"> 
          <div className="fw-semibold p-2"> HY-Ohjelmistotuotanto Miniprojekti S2023</div>
          <a className="ms-auto fw-semibold text-decoration-none p-2" href="https://github.com/sepaww/Ohtu_projekti"> Source code </a>
          </Stack>
        <Stack direction="horizontal"> 
          <div className="p-2"> Licenced under MIT-Licence</div>
          <div className="ms-auto p-2"> © Ryhmä2!</div>
        </Stack>
        </div>
      </Container>
    )
  }

export default Footer